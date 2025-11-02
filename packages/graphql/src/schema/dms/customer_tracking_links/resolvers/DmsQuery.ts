import type { CustomerTrackingLinks } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<
	DmsQueryResolvers,
	"customerTrackingLink" | "customerTrackingLinks"
> = {
	customerTrackingLinks: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("dms.customerTrackingLinks").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.from && args.to) {
			query = query
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		if (args.search) {
			query = query.where((eb) =>
				eb.or([
					eb("trackingToken", "ilike", `%${args.search}%`),
					eb("deliveryTaskId", "ilike", `%${args.search}%`),
				]),
			);
		}

		const results = await query.orderBy("createdAt", "desc").execute();

		return results as unknown as CustomerTrackingLinks[];
	},
	customerTrackingLink: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("dms.customerTrackingLinks")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirst();

		return (result as unknown as CustomerTrackingLinks) || null;
	},
};
