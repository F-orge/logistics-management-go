import type { SubscriptionResolvers } from "./../../../../types.generated";
export const returnStatusChanged: NonNullable<
	SubscriptionResolvers["returnStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.return.statusChanged"),
};
