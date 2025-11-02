import type { SubscriptionResolvers } from "./../../../../types.generated";
export const invoiceStatusChanged: NonNullable<
	SubscriptionResolvers["invoiceStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.invoice.statusChanged"),
};
