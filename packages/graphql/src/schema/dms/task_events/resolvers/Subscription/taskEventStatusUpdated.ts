import type { SubscriptionResolvers } from "./../../../../types.generated";
export const taskEventStatusUpdated: NonNullable<
	SubscriptionResolvers["taskEventStatusUpdated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("dms.taskEvent.statusUpdated"),
};
