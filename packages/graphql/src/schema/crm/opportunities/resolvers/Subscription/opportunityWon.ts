import type { SubscriptionResolvers } from './../../../../types.generated';
export const opportunityWon: NonNullable<SubscriptionResolvers['opportunityWon']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('crm.opportunity.won'),
};
