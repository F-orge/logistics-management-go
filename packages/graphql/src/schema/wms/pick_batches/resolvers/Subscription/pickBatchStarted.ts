import type { SubscriptionResolvers } from './../../../../types.generated';
export const pickBatchStarted: NonNullable<SubscriptionResolvers['pickBatchStarted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.pickBatch.started'),
};
