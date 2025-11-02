import type { SubscriptionResolvers } from "./../../../../types.generated";
export const documentGenerated: NonNullable<
	SubscriptionResolvers["documentGenerated"]
> = {
	subscribe: (_parent, _args, ctx) =>
		ctx.pubsub.asyncIterableIterator("billing.document.generated"),
};
