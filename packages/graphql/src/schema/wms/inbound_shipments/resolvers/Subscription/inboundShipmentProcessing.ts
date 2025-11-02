import type { SubscriptionResolvers } from "./../../../../types.generated";
export const inboundShipmentProcessing: NonNullable<
	SubscriptionResolvers["inboundShipmentProcessing"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("ims.inboundShipment.processing"),
};
