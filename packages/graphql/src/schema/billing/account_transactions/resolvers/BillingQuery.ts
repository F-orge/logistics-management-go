import { BillingTransactionTypeEnum } from "../../../../db.types";
import type { AccountTransactions } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<
	BillingQueryResolvers,
	"accountTransaction" | "accountTransactions"
> = {
	accountTransactions: async (parent, args, ctx) => {
		let query = ctx.db.selectFrom("billing.accountTransactions").selectAll();

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
				eb.or([eb("referenceNumber", "ilike", `%${args.search}%`)]),
			);
		}

		if (args.type) {
			query = query.where("type", "=", BillingTransactionTypeEnum[args.type]);
		}

		const results = await query.execute();

		return results as unknown as AccountTransactions[];
	},
	accountTransaction: async (_, args, ctx) => {
		const result = await ctx.db
			.selectFrom("billing.accountTransactions")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as AccountTransactions;
	},
};
