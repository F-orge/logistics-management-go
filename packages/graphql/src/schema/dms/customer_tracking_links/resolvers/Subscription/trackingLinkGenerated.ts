import type { SubscriptionResolvers } from "./../../../../types.generated";
export const trackingLinkGenerated: NonNullable<
	SubscriptionResolvers["trackingLinkGenerated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("dms.trackingLink.generated"),
};
