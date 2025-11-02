import type { SubscriptionResolvers } from './../../../../types.generated';
export const accountingSyncSucceeded: NonNullable<SubscriptionResolvers['accountingSyncSucceeded']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.accountingSync.succeeded'),
};
