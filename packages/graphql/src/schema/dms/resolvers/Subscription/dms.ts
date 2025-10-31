import type { SubscriptionResolvers } from "./../../../types.generated";
export const dms: NonNullable<SubscriptionResolvers['dms']> = {
  subscribe: async (_parent, _arg, ctx) => ctx.pubsub.asyncIterableIterator(""),
};
