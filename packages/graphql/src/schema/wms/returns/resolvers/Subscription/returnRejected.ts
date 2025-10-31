import type { SubscriptionResolvers } from './../../../../types.generated';
export const returnRejected: NonNullable<SubscriptionResolvers['returnRejected']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.return.rejected'),
};
