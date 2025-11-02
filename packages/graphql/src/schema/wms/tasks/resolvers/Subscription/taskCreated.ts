import type { SubscriptionResolvers } from './../../../../types.generated';
export const taskCreated: NonNullable<SubscriptionResolvers['taskCreated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.task.created'),
};
