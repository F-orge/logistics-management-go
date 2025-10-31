import type { SubscriptionResolvers } from './../../../../types.generated';
export const geofenceEntered: NonNullable<SubscriptionResolvers['geofenceEntered']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.geofence.entered'),
};
