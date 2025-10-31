import type { SubscriptionResolvers } from './../../../../types.generated';
export const paymentInitiated: NonNullable<SubscriptionResolvers['paymentInitiated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.payment.initiated'),
};
