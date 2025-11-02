import type { SubscriptionResolvers } from './../../../../types.generated';
export const invoiceSent: NonNullable<SubscriptionResolvers['invoiceSent']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.invoice.sent'),
};
