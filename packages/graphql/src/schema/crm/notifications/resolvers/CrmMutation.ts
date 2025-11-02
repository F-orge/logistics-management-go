import {
	CreateNotificationInputSchema,
	type Notifications,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";

export const CrmMutation: Pick<
	CrmMutationResolvers,
	"createNotification" | "updateNotification"
> = {
	createNotification: async (_parent, args, ctx) => {
		const payload = CreateNotificationInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("crm.notifications")
			.values(payload)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as Notifications;
	},
	updateNotification: async (_parent, args, ctx) => {
		const payload = CreateNotificationInputSchema().parse(args.value);

		// Get the previous state to detect changes
		const previousNotification = await ctx.db
			.selectFrom("crm.notifications")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		const result = await ctx.db
			.updateTable("crm.notifications")
			.set(payload)
			.where("id", "=", args.id)
			.where("isRead", "!=", true)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish marked event
		if (
			result.isRead !== previousNotification.isRead ||
			payload.isRead !== undefined
		) {
			await ctx.pubsub.publish("crm.notification.marked", {
				id: result.id,
				userId: result.userId,
				isRead: result.isRead ?? false,
			});
		}

		return result as unknown as Notifications;
	},
};
