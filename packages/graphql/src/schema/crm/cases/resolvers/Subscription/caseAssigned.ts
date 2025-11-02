import type { SubscriptionResolvers } from './../../../../types.generated';
export const caseAssigned: NonNullable<SubscriptionResolvers['caseAssigned']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('crm.case.assigned'),
};
