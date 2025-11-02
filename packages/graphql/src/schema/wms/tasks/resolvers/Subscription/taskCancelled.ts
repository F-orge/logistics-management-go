import type { SubscriptionResolvers } from './../../../../types.generated';
export const taskCancelled: NonNullable<SubscriptionResolvers['taskCancelled']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.task.cancelled'),
};
