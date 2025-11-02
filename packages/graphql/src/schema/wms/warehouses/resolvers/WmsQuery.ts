import { Warehouses } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, 'warehouse'|'warehouses'> = {
  warehouses: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.warehouses").selectAll();

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
          eb("address", "ilike", `%${args.search}%`),
          eb("city", "ilike", `%${args.search}%`),
          eb("state", "ilike", `%${args.search}%`),
          eb("postalCode", "ilike", `%${args.search}%`),
          eb("country", "ilike", `%${args.search}%`),
          eb("timezone", "ilike", `%${args.search}%`),
          eb("contactPerson", "ilike", `%${args.search}%`),
          eb("contactEmail", "ilike", `%${args.search}%`),
          eb("contactPhone", "ilike", `%${args.search}%`),
        ])
      );
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
