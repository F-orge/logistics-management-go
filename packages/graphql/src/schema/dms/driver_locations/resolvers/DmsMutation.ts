import {
  CreateDriverLocationInputSchema,
  DriverLocations,
  UpdateDriverLocationInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";
export const DmsMutation: Pick<
  DmsMutationResolvers,
  "createDriverLocation" | "removeDriverLocation" | "updateDriverLocation"
> = {
  createDriverLocation: async (_parent, args, ctx) => {
    const payload = CreateDriverLocationInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.driverLocations")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DriverLocations;
  },
  updateDriverLocation: async (_parent, args, ctx) => {
    const payload = UpdateDriverLocationInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("dms.driverLocations")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DriverLocations;
  },
  removeDriverLocation: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("dms.driverLocations")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
