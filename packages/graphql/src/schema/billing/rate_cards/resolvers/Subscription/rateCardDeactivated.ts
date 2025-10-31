import type { SubscriptionResolvers } from './../../../../types.generated';
export const rateCardDeactivated: NonNullable<SubscriptionResolvers['rateCardDeactivated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.rateCard.deactivated'),
};
