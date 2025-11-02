import type { SubscriptionResolvers } from "./../../../../types.generated";
export const deliveryTaskStatusChanged: NonNullable<
	SubscriptionResolvers["deliveryTaskStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("dms.deliveryTask.statusChanged"),
};
