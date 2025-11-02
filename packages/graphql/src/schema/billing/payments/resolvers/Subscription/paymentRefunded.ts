import type { SubscriptionResolvers } from "./../../../../types.generated";
export const paymentRefunded: NonNullable<
	SubscriptionResolvers["paymentRefunded"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.payment.refunded"),
};
