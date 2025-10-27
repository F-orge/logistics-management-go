import { TmsVehicleServiceTypeEnum } from "../../../../db.types";
import {
  CreateVehicleMaintenanceInputSchema,
  VehicleMaintenance,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";

export const TmsMutation: Pick<
  TmsMutationResolvers,
  | "addVehicleMaintenance"
  | "removeVehicleMaintenance"
  | "updateVehicleMaintenance"
> = {
  addVehicleMaintenance: async (_parent, args, ctx) => {
    const payload = CreateVehicleMaintenanceInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.vehicleMaintenance")
      .values({
        ...payload,
        vehicleId: args.id,
        serviceType: payload.serviceType
          ? TmsVehicleServiceTypeEnum[payload.serviceType]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish maintenance scheduled event
    ctx.pubsub.publish("tms.vehicle.maintenanceScheduled", result);

    return result as unknown as VehicleMaintenance;
  },
  updateVehicleMaintenance: async (_parent, args, ctx) => {
    const payload = CreateVehicleMaintenanceInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.vehicleMaintenance")
      .set({
        ...payload,
        serviceType: payload.serviceType
          ? TmsVehicleServiceTypeEnum[payload.serviceType]
          : undefined,
      })
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
