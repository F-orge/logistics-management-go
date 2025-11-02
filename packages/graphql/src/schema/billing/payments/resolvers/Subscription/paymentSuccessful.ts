import type { SubscriptionResolvers } from './../../../../types.generated';
export const paymentSuccessful: NonNullable<SubscriptionResolvers['paymentSuccessful']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.payment.successful'),
};
