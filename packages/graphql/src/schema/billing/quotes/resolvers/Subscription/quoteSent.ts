import type { SubscriptionResolvers } from './../../../../types.generated';
export const quoteSent: NonNullable<SubscriptionResolvers['quoteSent']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.quote.sent'),
};
