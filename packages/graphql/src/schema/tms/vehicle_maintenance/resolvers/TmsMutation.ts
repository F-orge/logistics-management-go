import {
  CreateVehicleMaintenanceInputSchema,
  VehicleMaintenance,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createVehicleMaintenance'|'removeVehicleMaintenance'|'updateVehicleMaintenance'> = {
  createVehicleMaintenance: async (_parent, args, ctx) => {
    const payload = CreateVehicleMaintenanceInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.vehicleMaintenance")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as VehicleMaintenance;
  },
  updateVehicleMaintenance: async (_parent, args, ctx) => {
    const payload = CreateVehicleMaintenanceInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.vehicleMaintenance")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as VehicleMaintenance;
  },
  removeVehicleMaintenance: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.vehicleMaintenance")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
