import type { SubscriptionResolvers } from './../../../../types.generated';
export const paymentProcessing: NonNullable<SubscriptionResolvers['paymentProcessing']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.payment.processing'),
};
