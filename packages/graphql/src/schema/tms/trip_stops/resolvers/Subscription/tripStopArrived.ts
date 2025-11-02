import type { SubscriptionResolvers } from "./../../../../types.generated";
export const tripStopArrived: NonNullable<
	SubscriptionResolvers["tripStopArrived"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("tms.tripStop.arrived"),
};
