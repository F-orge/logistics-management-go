import { GraphQLError } from "graphql";
import { TmsTripStatusEnum, TmsVehicleStatusEnum } from "../../../../db.types";
import {
	CreateTripInputSchema,
	type Trips,
	UpdateTripInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";

export const TmsMutation: Pick<
	TmsMutationResolvers,
	"createTrip" | "removeTrip" | "updateTrip"
> = {
	createTrip: async (_parent, args, ctx) => {
		const payload = CreateTripInputSchema().parse(args.value);

		// Validate driver exists if provided
		if (payload.driverId) {
			const driver = await ctx.db
				.selectFrom("tms.drivers")
				.select("id")
				.where("id", "=", payload.driverId)
				.executeTakeFirst();

			if (!driver) {
				throw new GraphQLError("Driver not found", {
					extensions: {
						code: "NOT_FOUND",
					},
				});
			}

			// Check if driver is already on an active trip
			const driverOnTrip = await ctx.db
				.selectFrom("tms.trips")
				.select("id")
				.where("driverId", "=", payload.driverId)
				.where((eb) =>
					eb.and([
						eb("status", "!=", TmsTripStatusEnum.COMPLETED),
						eb("status", "!=", TmsTripStatusEnum.CANCELLED),
					]),
				)
				.executeTakeFirst();

			if (driverOnTrip) {
				throw new GraphQLError("Driver is already assigned to an active trip", {
					extensions: {
						code: "BUSINESS_LOGIC_ERROR",
					},
				});
			}
		}

		// Validate vehicle exists if provided
		if (payload.vehicleId) {
			const vehicle = await ctx.db
				.selectFrom("tms.vehicles")
				.selectAll()
				.where("id", "=", payload.vehicleId)
				.executeTakeFirst();

			if (!vehicle) {
				throw new GraphQLError("Vehicle not found", {
					extensions: {
						code: "NOT_FOUND",
					},
				});
			}

			// Validate vehicle is available (not in maintenance)
			if (vehicle.status === TmsVehicleStatusEnum.IN_MAINTENANCE) {
				throw new GraphQLError(
					"Vehicle is currently in maintenance and cannot be assigned to a trip",
					{
						extensions: {
							code: "BUSINESS_LOGIC_ERROR",
						},
					},
				);
			}
		}

		const result = await ctx.db
			.insertInto("tms.trips")
			.values({
				...payload,
				status: payload.status ? TmsTripStatusEnum[payload.status] : undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish created event
		await ctx.pubsub.publish("tms.trip.created", result);

		return result as unknown as Trips;
	},
	updateTrip: async (_parent, args, ctx) => {
		const payload = UpdateTripInputSchema().parse(args.value);

		// Get the previous state to detect changes
		const previousTrip = await ctx.db
			.selectFrom("tms.trips")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		// Validate status transitions if status is being updated
		if (payload.status) {
			const validTransitions: Record<string, string[]> = {
				PLANNED: [TmsTripStatusEnum.IN_PROGRESS, TmsTripStatusEnum.CANCELLED],
				IN_PROGRESS: [TmsTripStatusEnum.COMPLETED, TmsTripStatusEnum.CANCELLED],
				COMPLETED: [],
				CANCELLED: [],
			};

			const previousStatus = previousTrip.status || TmsTripStatusEnum.PLANNED;
			const allowedTransitions =
				validTransitions[previousStatus as string] || [];

			if (!allowedTransitions.includes(payload.status as TmsTripStatusEnum)) {
				throw new GraphQLError(
					`Cannot transition trip status from ${previousStatus} to ${payload.status}`,
					{
						extensions: {
							code: "BUSINESS_LOGIC_ERROR",
						},
					},
				);
			}
		}

		const result = await ctx.db
			.updateTable("tms.trips")
			.set({
				...payload,
				status: payload.status ? TmsTripStatusEnum[payload.status] : undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish status changed event
		if (payload.status && payload.status !== previousTrip.status) {
			const status = payload.status as TmsTripStatusEnum;

			await ctx.pubsub.publish("tms.trip.statusChanged", {
				id: result.id,
				newStatus: status,
				previousStatus: previousTrip.status as TmsTripStatusEnum,
				driverId: result.driverId,
				vehicleId: result.vehicleId,
			});

			// Publish specific status events
			if (status === TmsTripStatusEnum.IN_PROGRESS) {
				await ctx.pubsub.publish("tms.trip.started", result);
			} else if (status === TmsTripStatusEnum.COMPLETED) {
				await ctx.pubsub.publish("tms.trip.completed", result);
			} else if (status === TmsTripStatusEnum.CANCELLED) {
				await ctx.pubsub.publish("tms.trip.cancelled", result);
			}
		}

		return result as unknown as Trips;
	},
	removeTrip: async (_parent, args, ctx) => {
		// Check if trip is in progress or completed - don't allow deletion
		const trip = await ctx.db
			.selectFrom("tms.trips")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirst();

		if (!trip) {
			throw new GraphQLError("Trip not found", {
				extensions: {
					code: "NOT_FOUND",
				},
			});
		}

		if (
			trip.status === TmsTripStatusEnum.IN_PROGRESS ||
			trip.status === TmsTripStatusEnum.COMPLETED
		) {
			throw new GraphQLError(
				"Cannot delete a trip that is in progress or already completed",
				{
					extensions: {
						code: "BUSINESS_LOGIC_ERROR",
					},
				},
			);
		}

		const result = await ctx.db
			.deleteFrom("tms.trips")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
