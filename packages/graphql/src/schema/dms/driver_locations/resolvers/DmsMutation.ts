import { GraphQLError } from "graphql";
import {
	CreateDriverLocationInputSchema,
	type DriverLocations,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<
	DmsMutationResolvers,
	"createDriverLocation" | "removeDriverLocation" | "updateDriverLocation"
> = {
	createDriverLocation: async (_parent, args, ctx) => {
		const payload = CreateDriverLocationInputSchema().parse(args.value);

		// Validate driver exists
		if (!payload.driverId) {
			throw new GraphQLError("driverId is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		try {
			// Check if driver exists
			const driver = await ctx.db
				.selectFrom("tms.drivers")
				.select("id")
				.where("id", "=", payload.driverId)
				.executeTakeFirst();

			if (!driver) {
				throw new GraphQLError("Driver not found", {
					extensions: { code: "NOT_FOUND" },
				});
			}

			// Validate coordinates
			if (payload.latitude < -90 || payload.latitude > 90) {
				throw new GraphQLError("Latitude must be between -90 and 90", {
					extensions: { code: "VALIDATION_ERROR" },
				});
			}

			if (payload.longitude < -180 || payload.longitude > 180) {
				throw new GraphQLError("Longitude must be between -180 and 180", {
					extensions: { code: "VALIDATION_ERROR" },
				});
			}

			const result = await ctx.db
				.insertInto("dms.driverLocations")
				.values(payload)
				.returningAll()
				.executeTakeFirstOrThrow();

			// Publish driver location updated event
			await ctx.pubsub.publish("dms.driverLocation.updated", result);

			return result as unknown as DriverLocations;
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to create driver location", {
				extensions: { code: "DATABASE_ERROR" },
			});
		}
	},
	updateDriverLocation: async (_parent, _args, _ctx) => {
		throw new GraphQLError(
			"Driver locations are immutable after creation. Cannot update existing location.",
			{
				extensions: { code: "BUSINESS_LOGIC_ERROR" },
			},
		);
	},
	removeDriverLocation: async (_parent, args, ctx) => {
		try {
			// Get the location to get the driver ID before deleting
			const location = await ctx.db
				.selectFrom("dms.driverLocations")
				.selectAll()
				.where("id", "=", args.id)
				.executeTakeFirstOrThrow();

			const result = await ctx.db
				.deleteFrom("dms.driverLocations")
				.where("id", "=", args.id)
				.executeTakeFirstOrThrow();

			// Publish driver location removed event
			await ctx.pubsub.publish("dms.driverLocation.removed", {
				id: location.id,
				driverId: location.driverId,
			});

			return {
				success: true,
				numDeletedRows: Number(result.numDeletedRows.toString()),
			};
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to remove driver location", {
				extensions: { code: "DATABASE_ERROR" },
			});
		}
	},
};
