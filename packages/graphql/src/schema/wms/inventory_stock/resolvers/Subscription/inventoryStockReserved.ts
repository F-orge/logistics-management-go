import type { SubscriptionResolvers } from './../../../../types.generated';
export const inventoryStockReserved: NonNullable<SubscriptionResolvers['inventoryStockReserved']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.inventoryStock.reserved'),
};
