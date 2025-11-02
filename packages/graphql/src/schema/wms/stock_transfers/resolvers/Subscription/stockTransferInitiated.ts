import type { SubscriptionResolvers } from "./../../../../types.generated";
export const stockTransferInitiated: NonNullable<
	SubscriptionResolvers["stockTransferInitiated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.stockTransfer.initiated"),
};
