import type { SubscriptionResolvers } from './../../../../types.generated';
export const taskPutawayCreated: NonNullable<SubscriptionResolvers['taskPutawayCreated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.task.putawayCreated'),
};
