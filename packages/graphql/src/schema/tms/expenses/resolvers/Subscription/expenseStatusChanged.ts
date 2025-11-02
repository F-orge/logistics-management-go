import type { SubscriptionResolvers } from "./../../../../types.generated";
export const expenseStatusChanged: NonNullable<
	SubscriptionResolvers["expenseStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("tms.expense.statusChanged"),
};
