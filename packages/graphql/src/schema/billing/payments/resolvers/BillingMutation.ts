import {
  BillingPaymentMethodEnum,
  BillingPaymentStatusEnum,
} from "../../../../db.types";
import {
  CreatePaymentInputSchema,
  Payments,
  UpdatePaymentInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<
  BillingMutationResolvers,
  "createPayment" | "removePayment" | "updatePayment"
> = {
  createPayment: async (_parent, args, ctx) => {
    const payload = CreatePaymentInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.payments")
      .values({
        ...payload,
        paymentMethod: payload.paymentMethod
          ? BillingPaymentMethodEnum[payload.paymentMethod]
          : BillingPaymentMethodEnum.WALLET,
        status: payload.status
          ? BillingPaymentStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish initiated event
    ctx.pubsub.publish("billing.payment.initiated", result);

    return result as unknown as Payments;
  },
  updatePayment: async (_parent, args, ctx) => {
    const payload = UpdatePaymentInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousPayment = await ctx.db
      .selectFrom("billing.payments")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("billing.payments")
      .set({
        ...payload,
        paymentMethod: payload.paymentMethod
          ? BillingPaymentMethodEnum[payload.paymentMethod]
          : BillingPaymentMethodEnum.WALLET,
        status: payload.status
          ? BillingPaymentStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousPayment.status) {
      const status = payload.status as BillingPaymentStatusEnum;

      ctx.pubsub.publish("billing.payment.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousPayment.status as BillingPaymentStatusEnum,
        invoiceId: result.invoiceId,
      });

      // Publish specific status events
      if (status === "PROCESSING") {
        ctx.pubsub.publish("billing.payment.processing", result);
      } else if (status === "SUCCESSFUL") {
        ctx.pubsub.publish("billing.payment.successful", result);
      } else if (status === "FAILED") {
        ctx.pubsub.publish("billing.payment.failed", {
          ...result,
          failureReason: null,
        });
      } else if (status === "REFUNDED") {
        ctx.pubsub.publish("billing.payment.refunded", {
          ...result,
          refundAmount: result.amount.toString(),
        });
      }
    }

    return result as unknown as Payments;
  },
  removePayment: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.payments")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
