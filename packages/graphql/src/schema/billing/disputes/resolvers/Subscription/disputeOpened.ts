import type { SubscriptionResolvers } from './../../../../types.generated';
export const disputeOpened: NonNullable<SubscriptionResolvers['disputeOpened']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.dispute.opened'),
};
