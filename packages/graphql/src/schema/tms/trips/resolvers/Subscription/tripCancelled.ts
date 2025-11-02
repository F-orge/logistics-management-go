import type { SubscriptionResolvers } from './../../../../types.generated';
export const tripCancelled: NonNullable<SubscriptionResolvers['tripCancelled']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.trip.cancelled'),
};
