import type { SubscriptionResolvers } from './../../../../types.generated';
export const vehicleStatusChanged: NonNullable<SubscriptionResolvers['vehicleStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.vehicle.statusChanged'),
};
