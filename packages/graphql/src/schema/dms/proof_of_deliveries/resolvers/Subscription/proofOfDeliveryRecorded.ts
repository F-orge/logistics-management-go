import type { SubscriptionResolvers } from "./../../../../types.generated";
export const proofOfDeliveryRecorded: NonNullable<
	SubscriptionResolvers["proofOfDeliveryRecorded"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("dms.proofOfDelivery.recorded"),
};
