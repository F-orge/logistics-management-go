import { Payments } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<BillingQueryResolvers, 'payment'|'payments'> =
  {
    payments: async (_parent, args, ctx) => {
      let query = ctx.db.selectFrom("billing.payments").selectAll();

      if (args.page && args.perPage) {
        const offset = (args.page - 1) * args.perPage;
        query = query.offset(offset).limit(args.perPage);
      }

      const results = await query.execute();

      return results as unknown as Payments[];
    },
    payment: async (_parent, args, ctx) => {
      const result = await ctx.db
        .selectFrom("billing.payments")
        .selectAll()
        .where("id", "=", args.id)
        .executeTakeFirstOrThrow();

      return result as unknown as Payments;
    },
  };
