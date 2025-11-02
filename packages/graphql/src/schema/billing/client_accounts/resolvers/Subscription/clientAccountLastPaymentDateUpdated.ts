import type { SubscriptionResolvers } from './../../../../types.generated';
export const clientAccountLastPaymentDateUpdated: NonNullable<SubscriptionResolvers['clientAccountLastPaymentDateUpdated']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.clientAccount.lastPaymentDateUpdated'),
};
