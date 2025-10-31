import type { SubscriptionResolvers } from './../../../../types.generated';
export const outboundShipmentPacked: NonNullable<SubscriptionResolvers['outboundShipmentPacked']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.outboundShipment.packed'),
};
