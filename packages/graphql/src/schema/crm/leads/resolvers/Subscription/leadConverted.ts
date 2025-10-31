import type { SubscriptionResolvers } from './../../../../types.generated';
export const leadConverted: NonNullable<SubscriptionResolvers['leadConverted']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('crm.lead.converted'),
};
