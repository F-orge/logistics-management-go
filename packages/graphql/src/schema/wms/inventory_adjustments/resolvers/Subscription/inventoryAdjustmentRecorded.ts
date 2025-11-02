import type { SubscriptionResolvers } from "./../../../../types.generated";
export const inventoryAdjustmentRecorded: NonNullable<
	SubscriptionResolvers["inventoryAdjustmentRecorded"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("ims.inventoryAdjustment.recorded"),
};
