import {
  CreateInvoiceLineItemInputSchema,
  InvoiceLineItems,
  UpdateInvoiceLineItemInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<
  BillingMutationResolvers,
  "createInvoiceLineItem" | "removeInvoiceLineItem" | "updateInvoiceLineItem"
> = {
  createInvoiceLineItem: async (_parent, args, ctx) => {
    const payload = CreateInvoiceLineItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.invoiceLineItems")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as InvoiceLineItems;
  },
  updateInvoiceLineItem: async (_parent, args, ctx) => {
    const payload = UpdateInvoiceLineItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.invoiceLineItems")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InvoiceLineItems;
  },
  removeInvoiceLineItem: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.invoiceLineItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
