import type { SubscriptionResolvers } from "./../../../../types.generated";
export const accountingSyncTriggered: NonNullable<
	SubscriptionResolvers["accountingSyncTriggered"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.accountingSync.triggered"),
};
