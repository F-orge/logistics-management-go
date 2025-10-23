import { Warehouses } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, "warehouse" | "warehouses"> = {
  warehouses: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.warehouses").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as Warehouses[];
  },
  warehouse: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.warehouses")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Warehouses;
  },
};
