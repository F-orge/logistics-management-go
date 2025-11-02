import type { SubscriptionResolvers } from "./../../../../types.generated";
export const disputeApproved: NonNullable<
	SubscriptionResolvers["disputeApproved"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.dispute.approved"),
};
