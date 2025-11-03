import {
	TmsCurrencyEnum,
	TmsExpenseStatusEnum,
	TmsExpenseTypeEnum,
} from "../../../../db.types";
import type { Expenses } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<TmsQueryResolvers, "expense" | "expenses"> = {
	expenses: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("tms.expenses").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.driverId) {
			query = query.where("driverId", "=", args.driverId);
		}

		if (args.from && args.to) {
			query = query
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		if (args.search) {
			query = query.where((eb) =>
				eb.or([
					eb("receiptUrl", "ilike", `%${args.search}%`),
					eb("description", "ilike", `%${args.search}%`),
				]),
			);
		}

		if (args.type) {
			query = query.where("type", "=", TmsExpenseTypeEnum[args.type]);
		}

		if (args.currency) {
			query = query.where("currency", "=", TmsCurrencyEnum[args.currency]);
		}

		if (args.status) {
			query = query.where("status", "=", TmsExpenseStatusEnum[args.status]);
		}

		const results = await query.execute();

		return results as unknown as Expenses[];
	},
	expense: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.expenses")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as Expenses;
	},
};
