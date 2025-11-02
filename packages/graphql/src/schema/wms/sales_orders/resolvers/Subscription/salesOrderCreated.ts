import type { SubscriptionResolvers } from './../../../../types.generated';
export const salesOrderCreated: NonNullable<SubscriptionResolvers['salesOrderCreated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.salesOrder.created'),
};
