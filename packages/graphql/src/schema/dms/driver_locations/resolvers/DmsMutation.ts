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
			throw new Error("driverId is required");
		}

		try {
			// Check if driver exists
			const driver = await ctx.db
				.selectFrom("tms.drivers")
				.select("id")
				.where("id", "=", payload.driverId)
				.executeTakeFirst();

			if (!driver) {
				throw new Error(`Driver with id ${payload.driverId} does not exist`);
			}

			// Validate coordinates
			if (payload.latitude < -90 || payload.latitude > 90) {
				throw new Error("Latitude must be between -90 and 90");
			}

			if (payload.longitude < -180 || payload.longitude > 180) {
				throw new Error("Longitude must be between -180 and 180");
			}

			const result = await ctx.db
				.insertInto("dms.driverLocations")
				.values(payload)
				.returningAll()
				.executeTakeFirstOrThrow();

			// Publish driver location updated event
			await ctx.pubsub.publish("dms.driverLocation.updated", result);

			return result as unknown as DriverLocations;
		} catch (error) {
			throw error;
		}
	},
	updateDriverLocation: async (_parent, args, ctx) => {
		throw new Error(
			"Driver locations are immutable after creation. Cannot update existing location.",
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
		} catch (error) {
			throw error;
		}
	},
};
