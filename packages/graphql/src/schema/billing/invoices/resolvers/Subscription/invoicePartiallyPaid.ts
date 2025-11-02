import type { SubscriptionResolvers } from "./../../../../types.generated";
export const invoicePartiallyPaid: NonNullable<
	SubscriptionResolvers["invoicePartiallyPaid"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.invoice.partiallyPaid"),
};
