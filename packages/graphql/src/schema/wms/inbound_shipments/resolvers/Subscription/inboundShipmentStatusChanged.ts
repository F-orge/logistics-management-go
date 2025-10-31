import type { SubscriptionResolvers } from './../../../../types.generated';
export const inboundShipmentStatusChanged: NonNullable<SubscriptionResolvers['inboundShipmentStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.inboundShipment.statusChanged'),
};
