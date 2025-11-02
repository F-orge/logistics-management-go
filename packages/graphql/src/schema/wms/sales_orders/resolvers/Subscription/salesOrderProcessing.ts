import type { SubscriptionResolvers } from "./../../../../types.generated";
export const salesOrderProcessing: NonNullable<
	SubscriptionResolvers["salesOrderProcessing"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.salesOrder.processing"),
};
