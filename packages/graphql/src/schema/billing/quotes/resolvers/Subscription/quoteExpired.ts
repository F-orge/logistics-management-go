import type { SubscriptionResolvers } from './../../../../types.generated';
export const quoteExpired: NonNullable<SubscriptionResolvers['quoteExpired']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.quote.expired'),
};
