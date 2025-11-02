import type { SubscriptionResolvers } from './../../../../types.generated';
export const disputeResolved: NonNullable<SubscriptionResolvers['disputeResolved']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.dispute.resolved'),
};
