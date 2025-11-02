import type { SubscriptionResolvers } from './../../../../types.generated';
export const inventoryAdjustmentDamagedReturn: NonNullable<SubscriptionResolvers['inventoryAdjustmentDamagedReturn']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.inventoryAdjustment.damagedReturn'),
};
