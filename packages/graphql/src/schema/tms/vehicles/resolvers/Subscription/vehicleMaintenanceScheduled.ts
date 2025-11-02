import type { SubscriptionResolvers } from './../../../../types.generated';
export const vehicleMaintenanceScheduled: NonNullable<SubscriptionResolvers['vehicleMaintenanceScheduled']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.vehicle.maintenanceScheduled'),
};
