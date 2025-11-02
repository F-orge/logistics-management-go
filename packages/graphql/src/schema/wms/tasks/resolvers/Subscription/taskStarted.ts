import type { SubscriptionResolvers } from "./../../../../types.generated";
export const taskStarted: NonNullable<SubscriptionResolvers["taskStarted"]> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.task.started"),
};
