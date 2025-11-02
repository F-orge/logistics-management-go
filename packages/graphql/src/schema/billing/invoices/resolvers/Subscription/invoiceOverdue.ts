import type { SubscriptionResolvers } from './../../../../types.generated';
export const invoiceOverdue: NonNullable<SubscriptionResolvers['invoiceOverdue']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.invoice.overdue'),
};
