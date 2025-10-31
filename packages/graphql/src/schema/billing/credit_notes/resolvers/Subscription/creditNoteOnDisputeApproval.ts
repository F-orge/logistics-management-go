import type { SubscriptionResolvers } from './../../../../types.generated';
export const creditNoteOnDisputeApproval: NonNullable<SubscriptionResolvers['creditNoteOnDisputeApproval']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.creditNote.onDisputeApproval'),
};
