import type { SubscriptionResolvers } from "./../../../../types.generated";
export const outboundShipmentPicking: NonNullable<
	SubscriptionResolvers["outboundShipmentPicking"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("ims.outboundShipment.picking"),
};
