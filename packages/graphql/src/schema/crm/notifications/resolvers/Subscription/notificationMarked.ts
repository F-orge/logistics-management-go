import type { SubscriptionResolvers } from "./../../../../types.generated";
export const notificationMarked: NonNullable<
	SubscriptionResolvers["notificationMarked"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("crm.notification.marked"),
};
