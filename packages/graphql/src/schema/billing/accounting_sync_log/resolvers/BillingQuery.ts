import { AccountingSyncLogs } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<BillingQueryResolvers, 'accountingSyncLog'|'accountingSyncLogs'> = {
  accountingSyncLogs: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("billing.accountingSyncLog").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as AccountingSyncLogs[];
  },
  accountingSyncLog: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.accountingSyncLog")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as AccountingSyncLogs;
  },
};
