import type { SubscriptionResolvers } from './../../../../types.generated';
export const deliveryTaskOutForDelivery: NonNullable<SubscriptionResolvers['deliveryTaskOutForDelivery']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('dms.deliveryTask.outForDelivery'),
};
