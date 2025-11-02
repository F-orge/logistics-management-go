import { WmsSalesOrderStatusEnum } from "../../../../db.types";
import type { SalesOrders } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, "salesOrder" | "salesOrders"> = {
	salesOrders: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("wms.salesOrders").selectAll();

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
					eb("orderNumber", "ilike", `%${args.search}%`),
					eb("shippingAddress", "ilike", `%${args.search}%`),
				]),
			);
		}

		if (args.status) {
			query = query.where("status", "=", WmsSalesOrderStatusEnum[args.status]);
		}

		const results = await query.execute();

		return results as unknown as SalesOrders[];
	},
	salesOrder: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.salesOrders")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as SalesOrders;
	},
};
