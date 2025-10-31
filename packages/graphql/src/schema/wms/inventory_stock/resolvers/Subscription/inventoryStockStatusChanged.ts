import type { SubscriptionResolvers } from './../../../../types.generated';
export const inventoryStockStatusChanged: NonNullable<SubscriptionResolvers['inventoryStockStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.inventoryStock.statusChanged'),
};
