import type { SubscriptionResolvers } from "./../../../../types.generated";
export const clientAccountBalanceUpdated: NonNullable<
	SubscriptionResolvers["clientAccountBalanceUpdated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.clientAccount.balanceUpdated"),
};
