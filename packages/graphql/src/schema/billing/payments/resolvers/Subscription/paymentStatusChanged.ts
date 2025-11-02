import type { SubscriptionResolvers } from './../../../../types.generated';
export const paymentStatusChanged: NonNullable<SubscriptionResolvers['paymentStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.payment.statusChanged'),
};
