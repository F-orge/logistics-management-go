import type { SubscriptionResolvers } from "./../../../../types.generated";
export const expenseApproved: NonNullable<
	SubscriptionResolvers["expenseApproved"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("tms.expense.approved"),
};
