import type { SubscriptionResolvers } from './../../../../types.generated';
export const tripStatusChanged: NonNullable<SubscriptionResolvers['tripStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.trip.statusChanged'),
};
