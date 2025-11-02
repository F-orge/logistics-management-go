import type { SubscriptionResolvers } from "./../../../../types.generated";
export const driverLocationUpdated: NonNullable<
	SubscriptionResolvers["driverLocationUpdated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("dms.driverLocation.updated"),
};
