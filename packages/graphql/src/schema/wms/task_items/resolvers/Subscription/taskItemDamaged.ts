import type { SubscriptionResolvers } from './../../../../types.generated';
export const taskItemDamaged: NonNullable<SubscriptionResolvers['taskItemDamaged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.taskItem.damaged'),
};
