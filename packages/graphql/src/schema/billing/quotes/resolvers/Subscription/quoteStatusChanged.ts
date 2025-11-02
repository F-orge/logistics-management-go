import type { SubscriptionResolvers } from "./../../../../types.generated";
export const quoteStatusChanged: NonNullable<
	SubscriptionResolvers["quoteStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.quote.statusChanged"),
};
