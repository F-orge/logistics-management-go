import type { SubscriptionResolvers } from "./../../../../types.generated";
export const deliveryRoutePaused: NonNullable<
	SubscriptionResolvers["deliveryRoutePaused"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("dms.deliveryRoute.paused"),
};
