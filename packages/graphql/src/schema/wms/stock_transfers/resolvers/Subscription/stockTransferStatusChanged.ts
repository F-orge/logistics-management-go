import type { SubscriptionResolvers } from './../../../../types.generated';
export const stockTransferStatusChanged: NonNullable<SubscriptionResolvers['stockTransferStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.stockTransfer.statusChanged'),
};
