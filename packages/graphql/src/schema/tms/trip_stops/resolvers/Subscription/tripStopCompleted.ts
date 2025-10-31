import type { SubscriptionResolvers } from './../../../../types.generated';
export const tripStopCompleted: NonNullable<SubscriptionResolvers['tripStopCompleted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.tripStop.completed'),
};
