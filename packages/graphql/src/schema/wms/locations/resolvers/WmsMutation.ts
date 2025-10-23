import {
  CreateLocationInputSchema,
  Locations,
  UpdateLocationInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createLocation" | "removeLocation" | "updateLocation"
> = {
  createLocation: async (_parent, args, ctx) => {
    const payload = CreateLocationInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.locations")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as Locations;
  },
  updateLocation: async (_parent, args, ctx) => {
    const payload = UpdateLocationInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.locations")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Locations;
  },
  removeLocation: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.locations")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
