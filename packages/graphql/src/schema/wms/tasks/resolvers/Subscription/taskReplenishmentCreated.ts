import type { SubscriptionResolvers } from "./../../../../types.generated";
export const taskReplenishmentCreated: NonNullable<
	SubscriptionResolvers["taskReplenishmentCreated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("wms.task.replenishmentCreated"),
};
