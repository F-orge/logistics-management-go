import type { SubscriptionResolvers } from './../../../../types.generated';
export const tripStopSkipped: NonNullable<SubscriptionResolvers['tripStopSkipped']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.tripStop.skipped'),
};
