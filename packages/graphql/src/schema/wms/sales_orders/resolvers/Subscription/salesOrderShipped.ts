import type { SubscriptionResolvers } from "./../../../../types.generated";
export const salesOrderShipped: NonNullable<
	SubscriptionResolvers["salesOrderShipped"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.salesOrder.shipped"),
};
