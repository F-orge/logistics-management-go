import type { SubscriptionResolvers } from "./../../../../types.generated";
export const expenseRejected: NonNullable<
	SubscriptionResolvers["expenseRejected"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("tms.expense.rejected"),
};
