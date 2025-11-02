import type { Geofences, Vehicles } from "../../../../zod.schema";
import type { GeofenceEventsResolvers } from "./../../../types.generated";
export const GeofenceEvents: GeofenceEventsResolvers = {
	geofence: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.geofences")
			.selectAll("tms.geofences")
			.innerJoin(
				"tms.geofenceEvents",
				"tms.geofenceEvents.geofenceId",
				"tms.geofences.id",
			)
			.where("tms.geofenceEvents.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Geofences;
	},
	vehicle: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.vehicles")
			.selectAll("tms.vehicles")
			.innerJoin(
				"tms.geofenceEvents",
				"tms.geofenceEvents.vehicleId",
				"tms.vehicles.id",
			)
			.where("tms.geofenceEvents.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Vehicles;
	},
};
