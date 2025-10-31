import type { SubscriptionResolvers } from './../../../../types.generated';
export const surchargeDeactivated: NonNullable<SubscriptionResolvers['surchargeDeactivated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.surcharge.deactivated'),
};
