import { Quotes } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<BillingQueryResolvers, 'quote'|'quotes'> = {
  quotes: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("billing.quotes").selectAll();

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
          eb("originDetails", "ilike", `%${args.search}%`),
          eb("destinationDetails", "ilike", `%${args.search}%`),
          eb("serviceLevel", "ilike", `%${args.search}%`),
          eb("quoteNumber", "ilike", `%${args.search}%`),
          eb("notes", "ilike", `%${args.search}%`),
        ])
      );
    }

    const results = await query.execute();

    return results as unknown as Quotes[];
  },
  quote: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.quotes")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Quotes;
  },
};
