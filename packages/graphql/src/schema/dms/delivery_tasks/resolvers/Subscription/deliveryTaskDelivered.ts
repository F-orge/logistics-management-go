import type { SubscriptionResolvers } from "./../../../../types.generated";
export const deliveryTaskDelivered: NonNullable<
	SubscriptionResolvers["deliveryTaskDelivered"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("dms.deliveryTask.delivered"),
};
