import type { SubscriptionResolvers } from "./../../../../types.generated";

export const taskEventRecorded: NonNullable<
	SubscriptionResolvers["taskEventRecorded"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("dms.taskEvent.recorded"),
};
