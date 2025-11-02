import type { SubscriptionResolvers } from './../../../../types.generated';
export const trackingLinkExpired: NonNullable<SubscriptionResolvers['trackingLinkExpired']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('dms.trackingLink.expired'),
};
