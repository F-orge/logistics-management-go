import type { SubscriptionResolvers } from "./../../../../types.generated";
export const pickBatchCompleted: NonNullable<
	SubscriptionResolvers["pickBatchCompleted"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.pickBatch.completed"),
};
