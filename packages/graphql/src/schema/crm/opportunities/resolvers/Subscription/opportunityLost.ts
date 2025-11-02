import type { SubscriptionResolvers } from "./../../../../types.generated";
export const opportunityLost: NonNullable<
	SubscriptionResolvers["opportunityLost"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("crm.opportunity.lost"),
};
