import {
  GeofenceEvents,
  GpsPings,
  Trips,
  VehicleMaintenance,
} from "../../../../zod.schema";
import type { VehiclesResolvers } from "./../../../types.generated";
export const Vehicles: VehiclesResolvers = {
  maintenances: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.vehicleMaintenance")
      .selectAll("tms.vehicleMaintenance")
      .where("tms.vehicleMaintenance.vehicleId", "=", parent.id as string)
      .execute();

    return results as unknown as VehicleMaintenance[];
  },
  gpsPings: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.gpsPings")
      .selectAll("tms.gpsPings")
      .where("tms.gpsPings.vehicleId", "=", parent.id as string)
      .execute();

    return results as unknown as GpsPings[];
  },
  trips: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.trips")
      .selectAll("tms.trips")
      .where("tms.trips.vehicleId", "=", parent.id as string)
      .execute();

    return results as unknown as Trips[];
  },
  geofenceEvents: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.geofenceEvents")
      .selectAll("tms.geofenceEvents")
      .where("tms.geofenceEvents.vehicleId", "=", parent.id as string)
      .execute();

    return results as unknown as GeofenceEvents[];
  },
};
