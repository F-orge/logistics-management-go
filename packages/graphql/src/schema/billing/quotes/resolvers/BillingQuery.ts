import { Quotes } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<BillingQueryResolvers, "quote" | "quotes"> = {
  quotes: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("billing.quotes").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
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
