import type { SubscriptionResolvers } from './../../../../types.generated';
export const tripCompleted: NonNullable<SubscriptionResolvers['tripCompleted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.trip.completed'),
};
