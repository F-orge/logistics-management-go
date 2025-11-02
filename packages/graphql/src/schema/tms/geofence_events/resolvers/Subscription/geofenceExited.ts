import type { SubscriptionResolvers } from "./../../../../types.generated";
export const geofenceExited: NonNullable<
	SubscriptionResolvers["geofenceExited"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("tms.geofence.exited"),
};
