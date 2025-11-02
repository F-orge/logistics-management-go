import type { SubscriptionResolvers } from "./../../../../types.generated";
export const pickBatchCreated: NonNullable<
	SubscriptionResolvers["pickBatchCreated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.pickBatch.created"),
};
