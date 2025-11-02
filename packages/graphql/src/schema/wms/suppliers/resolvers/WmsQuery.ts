import type { Suppliers } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, "supplier" | "suppliers"> = {
	suppliers: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("wms.suppliers").selectAll();

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
					eb("name", "ilike", `%${args.search}%`),
					eb("contactPerson", "ilike", `%${args.search}%`),
					eb("email", "ilike", `%${args.search}%`),
					eb("phoneNumber", "ilike", `%${args.search}%`),
				]),
			);
		}

		const results = await query.execute();

		return results as unknown as Suppliers[];
	},
	supplier: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.suppliers")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as Suppliers;
	},
};
