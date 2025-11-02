import type { GpsPings } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<TmsQueryResolvers, "gpsPing" | "gpsPings"> = {
	gpsPings: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("tms.gpsPings").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.from && args.to) {
			query = query
				.clearLimit()
				.clearOffset()
				.where("timestamp", ">=", args.from as Date)
				.where("timestamp", "<=", args.to as Date);
		}

		const results = await query.execute();

		return results as unknown as GpsPings[];
	},
	gpsPing: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.gpsPings")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as GpsPings;
	},
};
