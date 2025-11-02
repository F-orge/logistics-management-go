import type { Notifications } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<
	CrmQueryResolvers,
	"notification" | "notifications"
> = {
	notifications: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("crm.notifications").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.from && args.to) {
			query = query
				.clearLimit()
				.clearOffset()
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		if (args.search) {
			query = query.where((eb) =>
				eb.or([
					eb("message", "ilike", `%${args.search}%`),
					eb("link", "ilike", `%${args.search}%`),
				]),
			);
		}
		const results = await query.execute();
		return results as unknown as Notifications[];
	},
	notification: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.notifications")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as Notifications;
	},
};
