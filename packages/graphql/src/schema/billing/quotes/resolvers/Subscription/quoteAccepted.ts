import type { SubscriptionResolvers } from "./../../../../types.generated";
export const quoteAccepted: NonNullable<
	SubscriptionResolvers["quoteAccepted"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.quote.accepted"),
};
