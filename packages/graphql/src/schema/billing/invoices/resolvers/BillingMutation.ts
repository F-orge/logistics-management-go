import { BillingInvoiceStatusEnum } from "../../../../db.types";
import {
  BillingInvoices,
  CreateBillingInvoiceInputSchema,
  UpdateBillingInvoiceInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<BillingMutationResolvers, 'createBillingInvoice'|'removeBillingInvoice'|'updateBillingInvoice'> = {
  createBillingInvoice: async (_parent, args, ctx) => {
    const { items, ...payload } = CreateBillingInvoiceInputSchema().parse(
      args.value
    );

    const trx = await ctx.db.startTransaction().execute();

    const result = await ctx.db
      .insertInto("billing.invoices")
      .values({
        ...payload,
        status: payload.status
          ? BillingInvoiceStatusEnum[payload.status]
          : undefined,
        totalAmount: 0, // Initial total amount set to 0
        discountAmount: 0, // Initial discount amount set to 0
        taxAmount: 0, // Initial tax amount set to 0
        subtotal: 0, // Initial subtotal set to 0
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // add items
    const invoiceItems = await ctx.db
      .insertInto("billing.invoiceLineItems")
      .values(
        items.map((item) => ({
          ...item,
          invoiceId: result.id,
        }))
      )
      .returningAll()
      .execute();

    // update totals based on items
    const totalAmount = invoiceItems
      .map((row) => row.unitPrice * row.quantity)
      .reduce((a, b) => a + b, 0);

    const discountAmount = invoiceItems
      .map((row) => row.discountAmount || 0)
      .reduce((a, b) => a + b, 0);

    const taxAmount = invoiceItems
      .map((row) => row.taxAmount || 0)
      .reduce((a, b) => a + b, 0);

    const subtotal = totalAmount - discountAmount + taxAmount;

    const updatedInvoice = await ctx.db
      .updateTable("billing.invoices")
      .set({
        totalAmount,
        discountAmount,
        taxAmount,
        subtotal,
      })
      .where("id", "=", result.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    // Publish created event
    await ctx.pubsub.publish("billing.invoice.created", updatedInvoice);

    return updatedInvoice as unknown as BillingInvoices;
  },
  updateBillingInvoice: async (_parent, args, ctx) => {
    const payload = UpdateBillingInvoiceInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousInvoice = await ctx.db
      .selectFrom("billing.invoices")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("billing.invoices")
      .set({
        ...payload,
        status: payload.status
          ? BillingInvoiceStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousInvoice.status) {
      const status = payload.status as BillingInvoiceStatusEnum;

      await ctx.pubsub.publish("billing.invoice.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousInvoice.status as BillingInvoiceStatusEnum,
        clientId: result.clientId,
      });

      // Publish specific status events
      if (status === "SENT") {
        await ctx.pubsub.publish("billing.invoice.sent", result);
      } else if (status === "VIEWED") {
        await ctx.pubsub.publish("billing.invoice.viewed", result);
      } else if (status === "PAID") {
        await ctx.pubsub.publish("billing.invoice.paid", {
          ...result,
          paidAmount: result.amountPaid?.toString() || "0",
          remainingBalance: result.amountOutstanding?.toString() || "0",
        });
      } else if (status === "PARTIAL_PAID") {
        await ctx.pubsub.publish("billing.invoice.partiallyPaid", {
          ...result,
          paymentAmount: result.amountPaid?.toString() || "0",
          remainingBalance: result.amountOutstanding?.toString() || "0",
        });
      } else if (status === "PAST_DUE") {
        await ctx.pubsub.publish("billing.invoice.overdue", {
          id: result.id,
          clientId: result.clientId,
          amountOutstanding: result.amountOutstanding?.toString() || "0",
          dueDate: result.dueDate.toISOString(),
        });
      } else if (status === "DISPUTED") {
        // Find the dispute related to this invoice
        const dispute = await ctx.db
          .selectFrom("billing.disputes")
          .select("id")
          .innerJoin(
            "billing.invoiceLineItems",
            "billing.disputes.lineItemId",
            "billing.invoiceLineItems.id"
          )
          .where("billing.invoiceLineItems.invoiceId", "=", result.id)
          .executeTakeFirst();

        await ctx.pubsub.publish("billing.invoice.disputed", {
          ...result,
          disputeId: dispute?.id || "",
        });
      }
    }

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
