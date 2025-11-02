import type { SubscriptionResolvers } from './../../../../types.generated';
export const invoiceCreated: NonNullable<SubscriptionResolvers['invoiceCreated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.invoice.created'),
};
