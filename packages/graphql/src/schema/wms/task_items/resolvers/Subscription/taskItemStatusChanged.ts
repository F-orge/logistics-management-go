import type { SubscriptionResolvers } from "./../../../../types.generated";
export const taskItemStatusChanged: NonNullable<
	SubscriptionResolvers["taskItemStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.taskItem.statusChanged"),
};
