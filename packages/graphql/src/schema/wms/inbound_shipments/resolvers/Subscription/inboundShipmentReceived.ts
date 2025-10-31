import type { SubscriptionResolvers } from './../../../../types.generated';
export const inboundShipmentReceived: NonNullable<SubscriptionResolvers['inboundShipmentReceived']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.inboundShipment.received'),
};
