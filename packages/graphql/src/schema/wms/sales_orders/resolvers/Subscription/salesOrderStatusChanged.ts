import type { SubscriptionResolvers } from './../../../../types.generated';
export const salesOrderStatusChanged: NonNullable<SubscriptionResolvers['salesOrderStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.salesOrder.statusChanged'),
};
