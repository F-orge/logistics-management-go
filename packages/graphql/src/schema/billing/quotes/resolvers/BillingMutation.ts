import {
  CreateQuoteInputSchema,
  Quotes,
  UpdateQuoteInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<BillingMutationResolvers, 'createQuote'|'removeQuote'|'updateQuote'> = {
  createQuote: async (_parent, args, ctx) => {
    const payload = CreateQuoteInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.quotes")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Quotes;
  },
  updateQuote: async (_parent, args, ctx) => {
    const payload = UpdateQuoteInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.quotes")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Quotes;
  },
  removeQuote: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.quotes")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
