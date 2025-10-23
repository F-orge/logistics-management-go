import {
  CreateVehicleInputSchema,
  UpdateVehicleInputSchema,
  Vehicles,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createVehicle'|'removeVehicle'|'updateVehicle'> = {
  createVehicle: async (_parent, args, ctx) => {
    const payload = CreateVehicleInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.vehicles")
      .values(payload as any)
      .returningAll()

      .executeTakeFirst();

    return result as unknown as Vehicles;
  },
  updateVehicle: async (_parent, args, ctx) => {
    const payload = UpdateVehicleInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.vehicles")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Vehicles;
  },
  removeVehicle: async (_parent, args, ctx) => {
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
