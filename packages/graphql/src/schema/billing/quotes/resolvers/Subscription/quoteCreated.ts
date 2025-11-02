import type { SubscriptionResolvers } from "./../../../../types.generated";
export const quoteCreated: NonNullable<SubscriptionResolvers["quoteCreated"]> =
	{
		subscribe: (_parent, _args, ctx) =>
			ctx.pubsub.asyncIterableIterator("billing.quote.created"),
	};
