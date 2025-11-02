import { GraphQLError } from "graphql";
import { DmsDeliveryRouteStatusEnum } from "../../../../db.types";
import {
	CreateDeliveryRouteInputSchema,
	type DeliveryRoutes,
	UpdateDeliveryRouteInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

const VALID_STATUS_TRANSITIONS: Record<string, string[]> = {
	[DmsDeliveryRouteStatusEnum.PLANNED]: [
		DmsDeliveryRouteStatusEnum.IN_PROGRESS,
		DmsDeliveryRouteStatusEnum.CANCELLED,
	],
	[DmsDeliveryRouteStatusEnum.IN_PROGRESS]: [
		DmsDeliveryRouteStatusEnum.PAUSED,
		DmsDeliveryRouteStatusEnum.COMPLETED,
		DmsDeliveryRouteStatusEnum.CANCELLED,
	],
	[DmsDeliveryRouteStatusEnum.PAUSED]: [
		DmsDeliveryRouteStatusEnum.IN_PROGRESS,
		DmsDeliveryRouteStatusEnum.CANCELLED,
	],
	[DmsDeliveryRouteStatusEnum.COMPLETED]: [],
	[DmsDeliveryRouteStatusEnum.CANCELLED]: [],
};

export const DmsMutation: Pick<
	DmsMutationResolvers,
	"createDeliveryRoute" | "removeDeliveryRoute" | "updateDeliveryRoute"
> = {
	createDeliveryRoute: async (_parent, args, ctx) => {
		const payload = CreateDeliveryRouteInputSchema().parse(args.value);

		// Validate required fields
		if (!payload.driverId) {
			throw new GraphQLError("driver_id is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		if (!payload.routeDate) {
			throw new GraphQLError("routeDate is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		try {
			// Check if driver exists and is active
			const driver = await ctx.db
				.selectFrom("tms.drivers")
				.select(["id", "status"])
				.where("id", "=", payload.driverId)
				.executeTakeFirst();

			if (!driver) {
				throw new GraphQLError("Driver not found", {
					extensions: { code: "NOT_FOUND" },
				});
			}

			// Check if driver is active (optional enhancement)
			// Assuming there's an active/inactive status field
			if (driver.status && driver.status !== "ACTIVE") {
				throw new GraphQLError("Driver is not available", {
					extensions: { code: "BUSINESS_LOGIC_ERROR" },
				});
			}

			const result = await ctx.db
				.insertInto("dms.deliveryRoutes")
				.values({
					...payload,
					status: payload.status || DmsDeliveryRouteStatusEnum.PLANNED,
					optimizedSequence: null,
					optimizedRouteData: payload.optimizedRouteData || null,
				} as any)
				.returningAll()
				.executeTakeFirstOrThrow();

			return result as unknown as DeliveryRoutes;
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to create delivery route", {
				extensions: { code: "DATABASE_ERROR" },
			});
		}
	},
	updateDeliveryRoute: async (_parent, args, ctx) => {
		const payload = UpdateDeliveryRouteInputSchema().parse(args.value);

		try {
			// Get the previous state to detect changes
			const previousRoute = await ctx.db
				.selectFrom("dms.deliveryRoutes")
				.selectAll()
				.where("id", "=", args.id)
				.executeTakeFirstOrThrow();

			// Validate status transition
			if (payload.status) {
				const currentStatus =
					(previousRoute.status as string) ||
					DmsDeliveryRouteStatusEnum.PLANNED;
				const newStatus = payload.status as string;
				const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];

				if (!validTransitions || !validTransitions.includes(newStatus)) {
					throw new GraphQLError(
						`Cannot transition from ${currentStatus} to ${newStatus}`,
						{
							extensions: { code: "BUSINESS_LOGIC_ERROR" },
						},
					);
				}

				// Restrict field modifications based on status
				if (currentStatus === DmsDeliveryRouteStatusEnum.IN_PROGRESS) {
					// Only allow status and optimizedRouteData updates when IN_PROGRESS
					const allowedFields = ["status", "optimizedRouteData"];
					const updatingFields = Object.keys(payload).filter(
						(key) => payload[key as keyof typeof payload] !== undefined,
					);

					if (updatingFields.some((field) => !allowedFields.includes(field))) {
						throw new GraphQLError(
							"Can only update route optimization data and status when route is IN_PROGRESS",
							{
								extensions: { code: "BUSINESS_LOGIC_ERROR" },
							},
						);
					}
				}

				// Prevent task add/remove on active routes
				if (currentStatus === DmsDeliveryRouteStatusEnum.IN_PROGRESS) {
					if (payload.status !== DmsDeliveryRouteStatusEnum.IN_PROGRESS) {
						// Attempting to change status away from IN_PROGRESS is allowed
						// but nothing else
					}
				}
			}

			const result = await ctx.db
				.updateTable("dms.deliveryRoutes")
				.set(payload as any)
				.where("id", "=", args.id)
				.returningAll()
				.executeTakeFirstOrThrow();

			// Publish status changed events
			if (payload.status && payload.status !== previousRoute.status) {
				const status = payload.status as DmsDeliveryRouteStatusEnum;

				if (status === DmsDeliveryRouteStatusEnum.IN_PROGRESS) {
					await ctx.pubsub.publish("dms.deliveryRoute.started", result);
				} else if (status === DmsDeliveryRouteStatusEnum.COMPLETED) {
					await ctx.pubsub.publish("dms.deliveryRoute.completed", result);
				} else if (status === DmsDeliveryRouteStatusEnum.PAUSED) {
					await ctx.pubsub.publish("dms.deliveryRoute.paused", result);
				} else if (status === DmsDeliveryRouteStatusEnum.CANCELLED) {
					await ctx.pubsub.publish("dms.deliveryRoute.cancelled", result);
				}
			}

			return result as unknown as DeliveryRoutes;
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to update delivery route", {
				extensions: { code: "DATABASE_ERROR" },
			});
		}
	},
	removeDeliveryRoute: async (_parent, args, ctx) => {
		try {
			// Check if route exists and get its status
			const route = await ctx.db
				.selectFrom("dms.deliveryRoutes")
				.selectAll()
				.where("id", "=", args.id)
				.executeTakeFirstOrThrow();

			// Prevent deletion of COMPLETED or IN_PROGRESS routes
			if (
				route.status === DmsDeliveryRouteStatusEnum.COMPLETED ||
				route.status === DmsDeliveryRouteStatusEnum.IN_PROGRESS
			) {
				throw new GraphQLError(
					"Cannot delete delivery route with COMPLETED or IN_PROGRESS status. Only PLANNED, PAUSED, or CANCELLED routes can be deleted.",
					{
						extensions: { code: "BUSINESS_LOGIC_ERROR" },
					},
				);
			}

			const result = await ctx.db
				.deleteFrom("dms.deliveryRoutes")
				.where("id", "=", args.id)
				.executeTakeFirstOrThrow();

			return {
				success: true,
				numDeletedRows: Number(result.numDeletedRows.toString()),
			};
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to delete delivery route", {
				extensions: { code: "DATABASE_ERROR" },
			});
		}
	},
};
