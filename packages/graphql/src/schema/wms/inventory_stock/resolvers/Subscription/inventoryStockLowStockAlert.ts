import type { SubscriptionResolvers } from "./../../../../types.generated";
export const inventoryStockLowStockAlert: NonNullable<
	SubscriptionResolvers["inventoryStockLowStockAlert"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("ims.inventoryStock.lowStockAlert"),
};
