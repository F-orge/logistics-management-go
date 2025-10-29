import {
  BillingPaymentMethodEnum,
  BillingPaymentStatusEnum,
} from "../../../../db.types";
import { CreatePaymentInputSchema, Payments } from "../../../../zod.schema";
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
    await ctx.pubsub.publish("billing.payment.initiated", result);

    return result as unknown as Payments;
  },
};
