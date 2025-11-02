import type { SubscriptionResolvers } from "./../../../../types.generated";
export const outboundShipmentShipped: NonNullable<
	SubscriptionResolvers["outboundShipmentShipped"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("ims.outboundShipment.shipped"),
};
