import type { SubscriptionResolvers } from './../../../../types.generated';
export const crmInvoicePaid: NonNullable<SubscriptionResolvers['crmInvoicePaid']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('crm.invoice.paid'),
};
