import type { SubscriptionResolvers } from './../../../../types.generated';
export const outboundShipmentDelivered: NonNullable<SubscriptionResolvers['outboundShipmentDelivered']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.outboundShipment.delivered'),
};
