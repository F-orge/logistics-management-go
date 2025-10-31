import type { SubscriptionResolvers } from './../../../../types.generated';
export const returnApproved: NonNullable<SubscriptionResolvers['returnApproved']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('wms.return.approved'),
};
