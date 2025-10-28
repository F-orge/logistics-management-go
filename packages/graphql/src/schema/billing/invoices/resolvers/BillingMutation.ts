import { BillingInvoiceStatusEnum } from "../../../../db.types";
import {
  BillingInvoices,
  CreateBillingInvoiceInputSchema,
  UpdateBillingInvoiceInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<
  BillingMutationResolvers,
  "createBillingInvoice" | "removeBillingInvoice" | "updateBillingInvoice"
> = {
  createBillingInvoice: async (_parent, args, ctx) => {
    const payload = CreateBillingInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.invoices")
      .values({
        ...payload,
        status: payload.status
          ? BillingInvoiceStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish created event
    ctx.pubsub.publish("billing.invoice.created", result);

    return result as unknown as BillingInvoices;
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

      ctx.pubsub.publish("billing.invoice.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousInvoice.status as BillingInvoiceStatusEnum,
        clientId: result.clientId,
      });

      // Publish specific status events
      if (status === "SENT") {
        ctx.pubsub.publish("billing.invoice.sent", result);
      } else if (status === "VIEWED") {
        ctx.pubsub.publish("billing.invoice.viewed", result);
      } else if (status === "PAID") {
        ctx.pubsub.publish("billing.invoice.paid", {
          ...result,
          paidAmount: result.amountPaid?.toString() || "0",
          remainingBalance: result.amountOutstanding?.toString() || "0",
        });
      } else if (status === "PARTIAL_PAID") {
        ctx.pubsub.publish("billing.invoice.partiallyPaid", {
          ...result,
          paymentAmount: result.amountPaid?.toString() || "0",
          remainingBalance: result.amountOutstanding?.toString() || "0",
        });
      } else if (status === "PAST_DUE") {
        ctx.pubsub.publish("billing.invoice.overdue", {
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

        ctx.pubsub.publish("billing.invoice.disputed", {
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
