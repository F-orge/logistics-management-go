import type { SubscriptionResolvers } from './../../../../types.generated';
export const deliveryRouteCompleted: NonNullable<SubscriptionResolvers['deliveryRouteCompleted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('dms.deliveryRoute.completed'),
};
