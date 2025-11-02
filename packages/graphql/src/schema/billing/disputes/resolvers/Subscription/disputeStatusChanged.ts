import type { SubscriptionResolvers } from "./../../../../types.generated";
export const disputeStatusChanged: NonNullable<
	SubscriptionResolvers["disputeStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.dispute.statusChanged"),
};
