import type { SubscriptionResolvers } from "./../../../../types.generated";
export const pickBatchStatusChanged: NonNullable<
	SubscriptionResolvers["pickBatchStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.pickBatch.statusChanged"),
};
