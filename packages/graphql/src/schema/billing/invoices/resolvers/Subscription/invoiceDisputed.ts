import type { SubscriptionResolvers } from './../../../../types.generated';
export const invoiceDisputed: NonNullable<SubscriptionResolvers['invoiceDisputed']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.invoice.disputed'),
};
