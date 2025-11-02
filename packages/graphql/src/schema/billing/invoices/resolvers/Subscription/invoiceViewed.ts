import type { SubscriptionResolvers } from "./../../../../types.generated";
export const invoiceViewed: NonNullable<
	SubscriptionResolvers["invoiceViewed"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.invoice.viewed"),
};
