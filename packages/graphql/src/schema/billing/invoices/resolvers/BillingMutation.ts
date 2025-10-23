import {
  BillingInvoices,
  CreateBillingInvoiceInputSchema,
  UpdateBillingInvoiceInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<BillingMutationResolvers, 'createBillingInvoice'|'removeBillingInvoice'|'updateBillingInvoice'> = {
  createBillingInvoice: async (_parent, args, ctx) => {
    const payload = CreateBillingInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.invoices")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as BillingInvoices;
  },
  updateBillingInvoice: async (_parent, args, ctx) => {
    const payload = UpdateBillingInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.invoices")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as BillingInvoices;
  },
  removeBillingInvoice: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.invoices")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
