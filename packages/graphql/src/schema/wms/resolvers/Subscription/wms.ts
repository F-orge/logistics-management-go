import type { SubscriptionResolvers } from "./../../../types.generated";
export const wms: NonNullable<SubscriptionResolvers['wms']> = {
  subscribe: async (_parent, _arg, ctx) => ctx.pubsub.asyncIterableIterator(""),
};
