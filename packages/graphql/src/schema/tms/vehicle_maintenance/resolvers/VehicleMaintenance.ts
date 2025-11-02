import { Vehicles } from "../../../../zod.schema";
import type { VehicleMaintenanceResolvers } from "./../../../types.generated";
export const VehicleMaintenance: VehicleMaintenanceResolvers = {
  vehicle: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.vehicles")
      .selectAll("tms.vehicles")
      .innerJoin(
        "tms.vehicleMaintenance",
        "tms.vehicleMaintenance.vehicleId",
        "tms.vehicles.id"
      )
      .where("tms.vehicleMaintenance.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Vehicles;
  },
};
