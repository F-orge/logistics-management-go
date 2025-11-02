import type { SubscriptionResolvers } from "./../../../../types.generated";
export const taskCompleted: NonNullable<
	SubscriptionResolvers["taskCompleted"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.task.completed"),
};
