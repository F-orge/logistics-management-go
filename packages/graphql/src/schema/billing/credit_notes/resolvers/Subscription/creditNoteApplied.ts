import type { SubscriptionResolvers } from './../../../../types.generated';
export const creditNoteApplied: NonNullable<SubscriptionResolvers['creditNoteApplied']> = {
  subscribe: (_parent, _args, ctx) => ctx.pubsub.asyncIterableIterator('billing.creditNote.applied'),
};
