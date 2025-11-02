import type { SubscriptionResolvers } from "./../../../../types.generated";
export const outboundShipmentStatusChanged: NonNullable<
	SubscriptionResolvers["outboundShipmentStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("ims.outboundShipment.statusChanged"),
};
