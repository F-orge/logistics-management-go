import type { SubscriptionResolvers } from "./../../../../types.generated";
export const inventoryStockReleased: NonNullable<
	SubscriptionResolvers["inventoryStockReleased"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("ims.inventoryStock.released"),
};
