import type { SubscriptionResolvers } from './../../../../types.generated';
export const crmInvoiceStatusChanged: NonNullable<SubscriptionResolvers['crmInvoiceStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('crm.invoice.statusChanged'),
};
