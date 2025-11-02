import { BillingInvoices, Disputes, User } from "../../../../zod.schema";
import type { CreditNotesResolvers } from "./../../../types.generated";
export const CreditNotes: CreditNotesResolvers = {
  invoice: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.invoices")
      .selectAll("billing.invoices")
      .innerJoin(
        "billing.creditNotes",
        "billing.creditNotes.invoiceId",
        "billing.invoices.id"
      )
      .where("billing.creditNotes.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as BillingInvoices;
  },
  dispute: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.disputes")
      .selectAll("billing.disputes")
      .innerJoin(
        "billing.creditNotes",
        "billing.creditNotes.disputeId",
        "billing.disputes.id"
      )
      .where("billing.creditNotes.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Disputes;
  },
  createdByUser: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin(
        "billing.creditNotes",
        "billing.creditNotes.createdByUserId",
        "user.id"
      )
      .where("billing.creditNotes.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
};
