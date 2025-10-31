import type { SubscriptionResolvers } from './../../../../types.generated';
export const inboundShipmentCompleted: NonNullable<SubscriptionResolvers['inboundShipmentCompleted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('ims.inboundShipment.completed'),
};
