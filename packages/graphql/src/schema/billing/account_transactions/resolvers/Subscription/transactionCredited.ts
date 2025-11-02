import type { SubscriptionResolvers } from "./../../../../types.generated";
export const transactionCredited: NonNullable<
	SubscriptionResolvers["transactionCredited"]
> = {
	subscribe: async (_parent, _arg, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.transaction.credited"),
};
