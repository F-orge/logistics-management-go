import type { SubscriptionResolvers } from './../../../../types.generated';
export const disputeUnderReview: NonNullable<SubscriptionResolvers['disputeUnderReview']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.dispute.underReview'),
};
