import { CreditNotes } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<
  BillingQueryResolvers,
  "creditNote" | "creditNotes"
> = {
  creditNotes: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("billing.creditNotes").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as CreditNotes[];
  },
  creditNote: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.creditNotes")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as CreditNotes;
  },
};
