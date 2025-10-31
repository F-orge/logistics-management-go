import type { SubscriptionResolvers } from './../../../../types.generated';
export const shipmentCreatedFromPayment: NonNullable<SubscriptionResolvers['shipmentCreatedFromPayment']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.shipment.createdFromPayment'),
};
