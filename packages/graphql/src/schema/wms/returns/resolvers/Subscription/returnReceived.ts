import type { SubscriptionResolvers } from "./../../../../types.generated";
export const returnReceived: NonNullable<
	SubscriptionResolvers["returnReceived"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.return.received"),
};
