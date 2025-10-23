import {
  AccountTransactions,
  CreateAccountTransactionInputSchema,
  UpdateAccountTransactionInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<BillingMutationResolvers, 'createAccountTransaction'|'removeAccountTransaction'|'updateAccountTransaction'> = {
  createAccountTransaction: async (_parent, args, ctx) => {
    const payload = CreateAccountTransactionInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.accountTransactions")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as AccountTransactions;
  },
  updateAccountTransaction: async (_parent, args, ctx) => {
    const payload = UpdateAccountTransactionInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.accountTransactions")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as AccountTransactions;
  },
  removeAccountTransaction: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.accountTransactions")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
