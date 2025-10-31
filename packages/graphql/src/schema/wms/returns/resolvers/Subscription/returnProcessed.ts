import type { SubscriptionResolvers } from './../../../../types.generated';
export const returnProcessed: NonNullable<SubscriptionResolvers['returnProcessed']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.return.processed'),
};
