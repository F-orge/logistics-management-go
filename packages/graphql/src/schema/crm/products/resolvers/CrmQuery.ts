import { Products } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, 'product'|'products'> = {
  products: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("crm.products").selectAll();

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
          eb("description", "ilike", `%${args.search}%`),
        ])
      );
    }
    const products = await query.execute();
    return products as unknown as Products[];
  },
  product: async (_parent, args, ctx) => {
    const product = await ctx.db
      .selectFrom("crm.products")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return product as unknown as Products;
  },
};
