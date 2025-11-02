import type { SubscriptionResolvers } from './../../../../types.generated';
export const driverLocationRemoved: NonNullable<SubscriptionResolvers['driverLocationRemoved']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('dms.driverLocation.removed'),
};
