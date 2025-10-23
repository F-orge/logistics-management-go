import { AccountTransactions } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<BillingQueryResolvers, 'accountTransaction'|'accountTransactions'> = {
  accountTransactions: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("billing.accountTransactions").selectAll();

    if (args.page && args.perPage) {
      query.offset((args.page - 1) * args.perPage).limit(args.perPage);
    }

    if (args.from && args.to) {
      query
        .clearLimit()
        .clearOffset()
        .where("createdAt", ">=", args.from as Date)
        .where("createdAt", "<=", args.to as Date);
    }

    if (args.search) {
      query = query.where((eb) =>
        eb.or([
          eb("sourceRecordType", "ilike", `%${args.search}%`),
          eb("description", "ilike", `%${args.search}%`),
          eb("referenceNumber", "ilike", `%${args.search}%`),
        ])
      );
    }

    const results = await query.execute();

    return results as unknown as AccountTransactions[];
  },
  accountTransaction: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.accountTransactions")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as AccountTransactions;
  },
};
