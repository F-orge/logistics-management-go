import type { SubscriptionResolvers } from "./../../../../types.generated";
export const stockTransferInTransit: NonNullable<
	SubscriptionResolvers["stockTransferInTransit"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.stockTransfer.inTransit"),
};
