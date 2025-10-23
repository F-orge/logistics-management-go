import { CreditNotes } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<BillingQueryResolvers, 'creditNote'|'creditNotes'> = {
  creditNotes: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("billing.creditNotes").selectAll();

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
          eb("creditNoteNumber", "ilike", `%${args.search}%`),
          eb("reason", "ilike", `%${args.search}%`),
          eb("currency", "ilike", `%${args.search}%`),
          eb("notes", "ilike", `%${args.search}%`),
        ])
      );
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
