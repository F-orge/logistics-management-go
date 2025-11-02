import type { SubscriptionResolvers } from "./../../../../types.generated";
export const disputeDenied: NonNullable<
	SubscriptionResolvers["disputeDenied"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.dispute.denied"),
};
