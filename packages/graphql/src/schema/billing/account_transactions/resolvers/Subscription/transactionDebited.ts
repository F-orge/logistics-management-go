import type { SubscriptionResolvers } from "./../../../../types.generated";
export const transactionDebited: NonNullable<
	SubscriptionResolvers["transactionDebited"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.transaction.debited"),
};
