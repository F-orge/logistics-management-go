import type { SubscriptionResolvers } from './../../../../types.generated';
export const paymentFailed: NonNullable<SubscriptionResolvers['paymentFailed']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.payment.failed'),
};
