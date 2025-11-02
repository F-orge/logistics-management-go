import type { SubscriptionResolvers } from './../../../../types.generated';
export const stockTransferReceived: NonNullable<SubscriptionResolvers['stockTransferReceived']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.stockTransfer.received'),
};
