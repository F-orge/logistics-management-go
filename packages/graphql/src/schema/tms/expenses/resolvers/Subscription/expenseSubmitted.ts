import type { SubscriptionResolvers } from './../../../../types.generated';
export const expenseSubmitted: NonNullable<SubscriptionResolvers['expenseSubmitted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('tms.expense.submitted'),
};
