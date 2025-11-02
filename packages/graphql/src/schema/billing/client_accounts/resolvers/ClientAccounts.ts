import type { AccountTransactions, Companies } from "../../../../zod.schema";
import type { ClientAccountsResolvers } from "./../../../types.generated";
export const ClientAccounts: ClientAccountsResolvers = {
	client: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.companies")
			.selectAll("crm.companies")
			.innerJoin(
				"billing.clientAccounts",
				"billing.clientAccounts.clientId",
				"crm.companies.id",
			)
			.where("billing.clientAccounts.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Companies;
	},
	transactions: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("billing.accountTransactions")
			.selectAll("billing.accountTransactions")
			.where(
				"billing.accountTransactions.clientAccountId",
				"=",
				parent.id as string,
			)
			.execute();

		return results as unknown as AccountTransactions[];
	},
};
