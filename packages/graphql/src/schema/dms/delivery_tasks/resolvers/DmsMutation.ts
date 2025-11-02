import { GraphQLError } from "graphql";
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
			throw new GraphQLError("delivery_address is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		if (!payload.deliveryRouteId) {
			throw new GraphQLError("delivery_route_id is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		if (!payload.packageId) {
			throw new GraphQLError("package_id is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		try {
			// Validate delivery route exists
			const route = await ctx.db
				.selectFrom("dms.deliveryRoutes")
				.select("id")
				.where("id", "=", payload.deliveryRouteId)
				.executeTakeFirst();

			if (!route) {
				throw new GraphQLError("Delivery route not found", {
					extensions: { code: "NOT_FOUND" },
				});
			}

			// Validate package exists
			const pkg = await ctx.db
				.selectFrom("wms.packages")
				.select("id")
				.where("id", "=", payload.packageId)
				.executeTakeFirst();

			if (!pkg) {
				throw new GraphQLError("Package not found", {
					extensions: { code: "NOT_FOUND" },
				});
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
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to create delivery task", {
				extensions: { code: "DATABASE_ERROR" },
			});
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
				throw new GraphQLError(
					"Cannot update delivery task that has been delivered",
					{
						extensions: { code: "BUSINESS_LOGIC_ERROR" },
					},
				);
			}

			// Validate status transition
			if (payload.status) {
				const currentStatus =
					(previousTask.status as string) || DmsDeliveryTaskStatusEnum.PENDING;
				const newStatus = payload.status as string;
				const validTransitions = VALID_TASK_STATUS_TRANSITIONS[currentStatus];

				if (!validTransitions || !validTransitions.includes(newStatus)) {
					throw new GraphQLError(
						`Cannot transition from ${currentStatus} to ${newStatus}`,
						{
							extensions: { code: "BUSINESS_LOGIC_ERROR" },
						},
					);
				}

				// Validation: FAILED status must have failureReason
				if (
					newStatus === DmsDeliveryTaskStatusEnum.FAILED &&
					!payload.failureReason
				) {
					throw new GraphQLError(
						"failureReason is required when status is FAILED",
						{
							extensions: { code: "VALIDATION_ERROR" },
						},
					);
				}

				// Prevent address/time window updates once OUT_FOR_DELIVERY
				if (
					currentStatus === DmsDeliveryTaskStatusEnum.OUT_FOR_DELIVERY &&
					(payload.deliveryAddress || payload.estimatedArrivalTime)
				) {
					throw new GraphQLError(
						"Cannot update delivery address or time window once delivery is OUT_FOR_DELIVERY",
						{
							extensions: { code: "BUSINESS_LOGIC_ERROR" },
						},
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
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to update delivery task", {
				extensions: { code: "DATABASE_ERROR" },
			});
		}
	},
};
