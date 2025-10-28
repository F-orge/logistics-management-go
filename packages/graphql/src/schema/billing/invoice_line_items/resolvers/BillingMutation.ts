import {
  CreateInvoiceLineItemInputSchema,
  InvoiceLineItems,
  UpdateInvoiceLineItemInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<
  BillingMutationResolvers,
  "addInvoiceLineItem" | "removeInvoiceLineItem" | "updateInvoiceLineItem"
> = {
  addInvoiceLineItem: async (_parent, args, ctx) => {
    const payload = CreateInvoiceLineItemInputSchema().parse(args.value);

    const trx = await ctx.db.startTransaction().execute();

    const result = await ctx.db
      .insertInto("billing.invoiceLineItems")
      .values({
        ...payload,
        invoiceId: args.id,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Update invoice totals after adding line item
    await trx
      .updateTable("billing.invoices")
      .set({
        totalAmount: (eb) =>
          eb("totalAmount", "+", result.unitPrice * result.quantity),
        discountAmount: (eb) =>
          eb("discountAmount", "+", result.discountAmount || 0),
        taxAmount: (eb) => eb("taxAmount", "+", result.taxAmount || 0),
        subtotal: (eb) =>
          eb(
            "subtotal",
            "+",
            result.unitPrice * result.quantity -
              (result.discountAmount || 0) +
              (result.taxAmount || 0)
          ),
      })
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return result as unknown as InvoiceLineItems;
  },
  updateInvoiceLineItem: async (_parent, args, ctx) => {
    const payload = UpdateInvoiceLineItemInputSchema().parse(args.value);

    const trx = await ctx.db.startTransaction().execute();

    const oldItem = await ctx.db
      .selectFrom("billing.invoiceLineItems")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("billing.invoiceLineItems")
      .set(payload)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // get the new total amount based on differences

    const totalAmount =
      oldItem.unitPrice * oldItem.quantity - result.unitPrice * result.quantity;

    const discountAmount =
      (oldItem.discountAmount || 0) - (result.discountAmount || 0);

    const taxAmount = (oldItem.taxAmount || 0) - (result.taxAmount || 0);

    const subtotal = totalAmount - discountAmount + taxAmount;

    await ctx.db
      .updateTable("billing.invoices")
      .set({
        totalAmount: (eb) => eb("totalAmount", "-", totalAmount),
        discountAmount: (eb) => eb("discountAmount", "-", discountAmount),
        taxAmount: (eb) => eb("taxAmount", "-", taxAmount),
        subtotal: (eb) => eb("subtotal", "-", subtotal),
      })
      .where("id", "=", result.invoiceId)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return result as unknown as InvoiceLineItems;
  },
  removeInvoiceLineItem: async (_parent, args, ctx) => {
    const trx = await ctx.db.startTransaction().execute();

    const oldItem = await trx
      .selectFrom("billing.invoiceLineItems")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await trx
      .deleteFrom("billing.invoiceLineItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    // update the invoice totals before removing line item
    const totalAmount = oldItem.unitPrice * oldItem.quantity;

    const discountAmount = oldItem.discountAmount || 0;

    const taxAmount = oldItem.taxAmount || 0;

    const subtotal = totalAmount - discountAmount + taxAmount;

    await trx
      .updateTable("billing.invoices")
      .set({
        totalAmount: (eb) => eb("totalAmount", "-", totalAmount),
        discountAmount: (eb) => eb("discountAmount", "-", discountAmount),
        taxAmount: (eb) => eb("taxAmount", "-", taxAmount),
        subtotal: (eb) => eb("subtotal", "-", subtotal),
      })
      .where("id", "=", oldItem.invoiceId)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
