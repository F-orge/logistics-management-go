import type { SubscriptionResolvers } from "./../../../../types.generated";
export const taskItemShortPicked: NonNullable<
	SubscriptionResolvers["taskItemShortPicked"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.taskItem.shortPicked"),
};
