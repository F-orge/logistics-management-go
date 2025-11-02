import type { SubscriptionResolvers } from "./../../../../types.generated";
export const returnItemEvaluated: NonNullable<
	SubscriptionResolvers["returnItemEvaluated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.returnItem.evaluated"),
};
