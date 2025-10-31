import type { SubscriptionResolvers } from './../../../../types.generated';
export const deliveryRouteStarted: NonNullable<SubscriptionResolvers['deliveryRouteStarted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('dms.deliveryRoute.started'),
};
