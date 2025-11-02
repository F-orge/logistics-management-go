import type { SubscriptionResolvers } from "./../../../../types.generated";
export const opportunityStageChanged: NonNullable<
	SubscriptionResolvers["opportunityStageChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("crm.opportunity.stageChanged"),
};
