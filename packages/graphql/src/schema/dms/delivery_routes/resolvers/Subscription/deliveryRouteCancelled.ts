import type { SubscriptionResolvers } from './../../../../types.generated';
export const deliveryRouteCancelled: NonNullable<SubscriptionResolvers['deliveryRouteCancelled']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('dms.deliveryRoute.cancelled'),
};
