import type { SubscriptionResolvers } from "./../../../../types.generated";
export const tripCreated: NonNullable<SubscriptionResolvers["tripCreated"]> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("tms.trip.created"),
};
