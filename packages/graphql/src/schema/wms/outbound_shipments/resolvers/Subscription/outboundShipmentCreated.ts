import type { SubscriptionResolvers } from './../../../../types.generated';
export const outboundShipmentCreated: NonNullable<SubscriptionResolvers['outboundShipmentCreated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.outboundShipment.created'),
};
