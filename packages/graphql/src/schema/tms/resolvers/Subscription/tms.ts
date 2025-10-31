import type { SubscriptionResolvers } from "./../../../types.generated";
export const tms: NonNullable<SubscriptionResolvers['tms']> = {
  subscribe: async (_parent, _arg, ctx) => ctx.pubsub.asyncIterableIterator(""),
};
