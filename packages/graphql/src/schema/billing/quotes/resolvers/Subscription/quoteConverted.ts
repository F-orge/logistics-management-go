import type { SubscriptionResolvers } from "./../../../../types.generated";
export const quoteConverted: NonNullable<
	SubscriptionResolvers["quoteConverted"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.quote.converted"),
};
