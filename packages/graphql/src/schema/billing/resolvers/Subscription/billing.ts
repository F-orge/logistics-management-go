import type { SubscriptionResolvers } from "./../../../types.generated";
export const billing: NonNullable<SubscriptionResolvers['billing']> = {
  subscribe: async (_parent, _arg, ctx) => ctx.pubsub.asyncIterableIterator(""),
};
