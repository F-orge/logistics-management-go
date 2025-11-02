import { ClientAccounts, User } from "../../../../zod.schema";
import type { AccountTransactionsResolvers } from "./../../../types.generated";
export const AccountTransactions: AccountTransactionsResolvers = {
  clientAccount: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.clientAccounts")
      .selectAll("billing.clientAccounts")
      .innerJoin(
        "billing.accountTransactions",
        "billing.accountTransactions.clientAccountId",
        "billing.clientAccounts.id"
      )
      .where("billing.accountTransactions.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as ClientAccounts;
  },
  processedByUser: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin(
        "billing.accountTransactions",
        "billing.accountTransactions.processedByUserId",
        "user.id"
      )
      .where("billing.accountTransactions.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
};
