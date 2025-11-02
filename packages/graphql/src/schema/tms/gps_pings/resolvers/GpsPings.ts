import { Vehicles } from "../../../../zod.schema";
import type { GpsPingsResolvers } from "./../../../types.generated";
export const GpsPings: GpsPingsResolvers = {
  vehicle: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.vehicles")
      .selectAll("tms.vehicles")
      .innerJoin("tms.gpsPings", "tms.gpsPings.vehicleId", "tms.vehicles.id")
      .where("tms.gpsPings.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Vehicles;
  },
};
