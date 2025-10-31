import type { SubscriptionResolvers } from './../../../../types.generated';
export const taskAssigned: NonNullable<SubscriptionResolvers['taskAssigned']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.task.assigned'),
};
