import type { DriverLocations } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<
	DmsQueryResolvers,
	"driverLocation" | "driverLocations"
> = {
	driverLocations: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("dms.driverLocations").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.from && args.to) {
			query = query
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		const results = await query.orderBy("timestamp", "desc").execute();

		return results as unknown as DriverLocations[];
	},
	driverLocation: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("dms.driverLocations")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirst();

		return (result as unknown as DriverLocations) || null;
	},
};
