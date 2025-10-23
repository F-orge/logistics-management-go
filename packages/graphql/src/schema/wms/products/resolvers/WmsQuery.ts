import { WmsProducts } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, 'wmsProduct'|'wmsProducts'> = {
  wmsProducts: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.products").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    if (args.from && args.to) {
      query = query
        .clearLimit()
        .clearOffset()
        .where("createdAt", ">=", args.from as Date)
        .where("createdAt", "<=", args.to as Date);
    }

    if (args.search) {
      query = query.where((eb) =>
        eb.or([
          eb("name", "ilike", `%${args.search}%`),
          eb("sku", "ilike", `%${args.search}%`),
          eb("barcode", "ilike", `%${args.search}%`),
          eb("description", "ilike", `%${args.search}%`),
        ])
      );
    }

    const results = await query.execute();

    return results as unknown as WmsProducts[];
  },
  wmsProduct: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as WmsProducts;
  },
};
