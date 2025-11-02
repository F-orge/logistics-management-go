import type { SubscriptionResolvers } from './../../../../types.generated';
export const salesOrderCompleted: NonNullable<SubscriptionResolvers['salesOrderCompleted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.salesOrder.completed'),
};
