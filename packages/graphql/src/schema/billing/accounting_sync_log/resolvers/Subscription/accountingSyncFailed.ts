import type { SubscriptionResolvers } from "./../../../../types.generated";
export const accountingSyncFailed: NonNullable<
	SubscriptionResolvers["accountingSyncFailed"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.accountingSync.failed"),
};
