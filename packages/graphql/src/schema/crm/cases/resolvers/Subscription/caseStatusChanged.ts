import type { SubscriptionResolvers } from './../../../../types.generated';
export const caseStatusChanged: NonNullable<SubscriptionResolvers['caseStatusChanged']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('crm.case.statusChanged'),
};
