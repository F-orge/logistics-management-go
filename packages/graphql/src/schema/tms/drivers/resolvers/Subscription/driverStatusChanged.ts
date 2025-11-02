import type { SubscriptionResolvers } from './../../../../types.generated';
export const driverStatusChanged: NonNullable<SubscriptionResolvers['driverStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.driver.statusChanged'),
};
