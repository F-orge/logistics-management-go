import type { SubscriptionResolvers } from './../../../../types.generated';
export const tripStarted: NonNullable<SubscriptionResolvers['tripStarted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.trip.started'),
};
