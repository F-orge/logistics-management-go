import type { SubscriptionResolvers } from "./../../../../types.generated";
export const invoicePaid: NonNullable<SubscriptionResolvers["invoicePaid"]> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.invoice.paid"),
};
