import { GraphQLError } from "graphql";
import { TmsTripStatusEnum, TmsVehicleStatusEnum } from "../../../../db.types";
import {
	CreateVehicleInputSchema,
	UpdateVehicleInputSchema,
	type Vehicles,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
	TmsMutationResolvers,
	"createVehicle" | "removeVehicle" | "updateVehicle"
> = {
	createVehicle: async (_parent, args, ctx) => {
		const payload = CreateVehicleInputSchema().parse(args.value);

		// Check for duplicate registration number
		const existingVehicle = await ctx.db
			.selectFrom("tms.vehicles")
			.select("id")
			.where("registrationNumber", "=", payload.registrationNumber)
			.executeTakeFirst();

		if (existingVehicle) {
			throw new GraphQLError(
				"Vehicle with this registration number already exists",
				{
					extensions: {
						code: "DUPLICATE_ERROR",
					},
				},
			);
		}

		// Validate capacity is positive if provided
		if (
			payload.capacityWeight !== undefined &&
			payload.capacityWeight !== null &&
			payload.capacityWeight <= 0
		) {
			throw new GraphQLError("Vehicle capacity weight must be positive", {
				extensions: {
					code: "VALIDATION_ERROR",
				},
			});
		}

		if (
			payload.capacityVolume !== undefined &&
			payload.capacityVolume !== null &&
			payload.capacityVolume <= 0
		) {
			throw new GraphQLError("Vehicle capacity volume must be positive", {
				extensions: {
					code: "VALIDATION_ERROR",
				},
			});
		}

		const result = await ctx.db
			.insertInto("tms.vehicles")
			.values({
				...payload,
				status: payload.status
					? TmsVehicleStatusEnum[payload.status]
					: undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as Vehicles;
	},
	updateVehicle: async (_parent, args, ctx) => {
		const payload = UpdateVehicleInputSchema().parse(args.value);

		// Get the previous state to detect changes
		const previousVehicle = await ctx.db
			.selectFrom("tms.vehicles")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		// Check for duplicate registration number if being updated
		if (
			payload.registrationNumber &&
			payload.registrationNumber !== previousVehicle.registrationNumber
		) {
			const existingVehicle = await ctx.db
				.selectFrom("tms.vehicles")
				.select("id")
				.where("registrationNumber", "=", payload.registrationNumber)
				.executeTakeFirst();

			if (existingVehicle) {
				throw new GraphQLError(
					"Vehicle with this registration number already exists",
					{
						extensions: {
							code: "DUPLICATE_ERROR",
						},
					},
				);
			}
		}

		// Validate capacity is positive if being updated
		if (
			payload.capacityWeight !== undefined &&
			payload.capacityWeight !== null &&
			payload.capacityWeight <= 0
		) {
			throw new GraphQLError("Vehicle capacity weight must be positive", {
				extensions: {
					code: "VALIDATION_ERROR",
				},
			});
		}

		if (
			payload.capacityVolume !== undefined &&
			payload.capacityVolume !== null &&
			payload.capacityVolume <= 0
		) {
			throw new GraphQLError("Vehicle capacity volume must be positive", {
				extensions: {
					code: "VALIDATION_ERROR",
				},
			});
		}

		const result = await ctx.db
			.updateTable("tms.vehicles")
			.set({
				...payload,
				status: payload.status
					? TmsVehicleStatusEnum[payload.status]
					: undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish status changed event
		if (payload.status && payload.status !== previousVehicle.status) {
			await ctx.pubsub.publish("tms.vehicle.statusChanged", {
				id: result.id,
				newStatus: payload.status as TmsVehicleStatusEnum,
				previousStatus: previousVehicle.status as TmsVehicleStatusEnum,
			});
		}

		return result as unknown as Vehicles;
	},
	removeVehicle: async (_parent, args, ctx) => {
		// Check if vehicle is on active trip
		const activeTrip = await ctx.db
			.selectFrom("tms.trips")
			.select("id")
			.where("vehicleId", "=", args.id)
			.where("status", "=", TmsTripStatusEnum.IN_PROGRESS)
			.executeTakeFirst();

		if (activeTrip) {
			throw new GraphQLError(
				"Cannot delete vehicle on active trip. Please complete or cancel the trip first.",
				{
					extensions: {
						code: "BUSINESS_LOGIC_ERROR",
					},
				},
			);
		}

		const result = await ctx.db
			.deleteFrom("tms.vehicles")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
