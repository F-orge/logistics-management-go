import type { SubscriptionResolvers } from './../../../../types.generated';
export const taskItemCompleted: NonNullable<SubscriptionResolvers['taskItemCompleted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.taskItem.completed'),
};
