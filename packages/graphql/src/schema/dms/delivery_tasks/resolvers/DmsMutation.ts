import {
	DmsDeliveryFailureReasonEnum,
	DmsDeliveryTaskStatusEnum,
} from "../../../../db.types";
import {
	CreateDeliveryTaskInputSchema,
	type DeliveryTasks,
	UpdateDeliveryTaskInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

const VALID_TASK_STATUS_TRANSITIONS: Record<string, string[]> = {
	[DmsDeliveryTaskStatusEnum.PENDING]: [
		DmsDeliveryTaskStatusEnum.ASSIGNED,
		DmsDeliveryTaskStatusEnum.CANCELLED,
	],
	[DmsDeliveryTaskStatusEnum.ASSIGNED]: [
		DmsDeliveryTaskStatusEnum.OUT_FOR_DELIVERY,
		DmsDeliveryTaskStatusEnum.RESCHEDULED,
		DmsDeliveryTaskStatusEnum.CANCELLED,
	],
	[DmsDeliveryTaskStatusEnum.OUT_FOR_DELIVERY]: [
		DmsDeliveryTaskStatusEnum.DELIVERED,
		DmsDeliveryTaskStatusEnum.FAILED,
		DmsDeliveryTaskStatusEnum.RESCHEDULED,
	],
	[DmsDeliveryTaskStatusEnum.DELIVERED]: [],
	[DmsDeliveryTaskStatusEnum.FAILED]: [DmsDeliveryTaskStatusEnum.RESCHEDULED],
	[DmsDeliveryTaskStatusEnum.RESCHEDULED]: [
		DmsDeliveryTaskStatusEnum.ASSIGNED,
		DmsDeliveryTaskStatusEnum.CANCELLED,
	],
	[DmsDeliveryTaskStatusEnum.CANCELLED]: [],
};

export const DmsMutation: Pick<
	DmsMutationResolvers,
	"createDeliveryTask" | "updateDeliveryTask"
> = {
	createDeliveryTask: async (_parent, args, ctx) => {
		const payload = CreateDeliveryTaskInputSchema().parse(args.value);

		// Validate required fields
		if (!payload.deliveryAddress) {
			throw new Error("delivery_address is required");
		}

		if (!payload.deliveryRouteId) {
			throw new Error("delivery_route_id is required");
		}

		if (!payload.packageId) {
			throw new Error("package_id is required");
		}

		try {
			// Validate delivery route exists
			const route = await ctx.db
				.selectFrom("dms.deliveryRoutes")
				.select("id")
				.where("id", "=", payload.deliveryRouteId)
				.executeTakeFirst();

			if (!route) {
				throw new Error(
					`Delivery route with id ${payload.deliveryRouteId} does not exist`,
				);
			}

			// Validate package exists
			const pkg = await ctx.db
				.selectFrom("wms.packages")
				.select("id")
				.where("id", "=", payload.packageId)
				.executeTakeFirst();

			if (!pkg) {
				throw new Error(`Package with id ${payload.packageId} does not exist`);
			}

			const result = await ctx.db
				.insertInto("dms.deliveryTasks")
				.values({
					...payload,
					status: payload.status
						? DmsDeliveryTaskStatusEnum[payload.status]
						: DmsDeliveryTaskStatusEnum.PENDING,
				})
				.returningAll()
				.executeTakeFirstOrThrow();

			return result as unknown as DeliveryTasks;
		} catch (error) {
			throw error;
		}
	},
	updateDeliveryTask: async (_parent, args, ctx) => {
		const payload = UpdateDeliveryTaskInputSchema().parse(args.value);

		try {
			// Get the previous state to detect changes
			const previousTask = await ctx.db
				.selectFrom("dms.deliveryTasks")
				.selectAll()
				.where("id", "=", args.id)
				.executeTakeFirstOrThrow();

			// Prevent modifications to DELIVERED tasks
			if (previousTask.status === DmsDeliveryTaskStatusEnum.DELIVERED) {
				throw new Error("Cannot update delivery task that has been delivered");
			}

			// Validate status transition
			if (payload.status) {
				const currentStatus =
					(previousTask.status as string) || DmsDeliveryTaskStatusEnum.PENDING;
				const newStatus = payload.status as string;
				const validTransitions = VALID_TASK_STATUS_TRANSITIONS[currentStatus];

				if (!validTransitions || !validTransitions.includes(newStatus)) {
					throw new Error(
						`Invalid status transition from ${currentStatus} to ${newStatus}`,
					);
				}

				// Validation: FAILED status must have failureReason
				if (
					newStatus === DmsDeliveryTaskStatusEnum.FAILED &&
					!payload.failureReason
				) {
					throw new Error("failureReason is required when status is FAILED");
				}

				// Prevent address/time window updates once OUT_FOR_DELIVERY
				if (
					currentStatus === DmsDeliveryTaskStatusEnum.OUT_FOR_DELIVERY &&
					(payload.deliveryAddress || payload.estimatedArrivalTime)
				) {
					throw new Error(
						"Cannot update delivery address or time window once delivery is OUT_FOR_DELIVERY",
					);
				}
			}

			const result = await ctx.db
				.updateTable("dms.deliveryTasks")
				.set({
					...payload,
					status: payload.status
						? DmsDeliveryTaskStatusEnum[payload.status]
						: undefined,
					failureReason: payload.failureReason
						? DmsDeliveryFailureReasonEnum[payload.failureReason]
						: undefined,
				})
				.where("id", "=", args.id)
				.returningAll()
				.executeTakeFirstOrThrow();

			// Publish status changed events
			if (payload.status && payload.status !== previousTask.status) {
				const status = payload.status as DmsDeliveryTaskStatusEnum;

				await ctx.pubsub.publish("dms.deliveryTask.statusChanged", {
					id: result.id,
					newStatus: status,
					previousStatus: previousTask.status as DmsDeliveryTaskStatusEnum,
					deliveryRouteId: result.deliveryRouteId,
				});

				if (status === DmsDeliveryTaskStatusEnum.OUT_FOR_DELIVERY) {
					await ctx.pubsub.publish("dms.deliveryTask.outForDelivery", result);
				} else if (status === DmsDeliveryTaskStatusEnum.DELIVERED) {
					await ctx.pubsub.publish("dms.deliveryTask.delivered", result);
				} else if (status === DmsDeliveryTaskStatusEnum.FAILED) {
					await ctx.pubsub.publish("dms.deliveryTask.failed", result);
				}
			}

			return result as unknown as DeliveryTasks;
		} catch (error) {
			throw error;
		}
	},
};
