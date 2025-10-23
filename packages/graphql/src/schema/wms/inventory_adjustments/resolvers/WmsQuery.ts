import { InventoryAdjustments } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<
  WmsQueryResolvers,
  "inventoryAdjustment" | "inventoryAdjustments"
> = {
  inventoryAdjustments: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.inventoryAdjustments").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as InventoryAdjustments[];
  },
  inventoryAdjustment: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.inventoryAdjustments")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as InventoryAdjustments;
  },
};
