import {
  CreateCreditNoteInputSchema,
  CreditNotes,
  UpdateCreditNoteInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<BillingMutationResolvers, 'createCreditNote'|'removeCreditNote'|'updateCreditNote'> = {
  createCreditNote: async (_parent, args, ctx) => {
    const payload = CreateCreditNoteInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.creditNotes")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as CreditNotes;
  },
  updateCreditNote: async (_parent, args, ctx) => {
    const payload = UpdateCreditNoteInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.creditNotes")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as CreditNotes;
  },
  removeCreditNote: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.creditNotes")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
