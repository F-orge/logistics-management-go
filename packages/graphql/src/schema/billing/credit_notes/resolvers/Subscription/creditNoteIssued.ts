import type { SubscriptionResolvers } from './../../../../types.generated';
export const creditNoteIssued: NonNullable<SubscriptionResolvers['creditNoteIssued']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.creditNote.issued'),
};
