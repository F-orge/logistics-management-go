import type { SubscriptionResolvers } from "./../../../types.generated";
export const crm: NonNullable<SubscriptionResolvers['crm']> = {
  subscribe: async (_parent, _arg, ctx) => ctx.pubsub.asyncIterableIterator(""),
};
