import type { SubscriptionResolvers } from "./../../../../types.generated";
export const leadStatusChanged: NonNullable<
	SubscriptionResolvers["leadStatusChanged"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("crm.lead.statusChanged"),
};
