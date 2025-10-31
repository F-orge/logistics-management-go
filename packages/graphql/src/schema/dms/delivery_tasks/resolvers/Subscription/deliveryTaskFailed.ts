import type { SubscriptionResolvers } from './../../../../types.generated';
export const deliveryTaskFailed: NonNullable<SubscriptionResolvers['deliveryTaskFailed']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('dms.deliveryTask.failed'),
};
