import type { SubscriptionResolvers } from "./../../../../types.generated";
export const taskStatusChanged: NonNullable<
	SubscriptionResolvers["taskStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.task.statusChanged"),
};
