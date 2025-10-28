import { BillingTransactionTypeEnum } from "../../../../db.types";
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
      .values({
        ...payload,
        type: payload.type
          ? BillingTransactionTypeEnum[payload.type]
          : BillingTransactionTypeEnum.DEBIT,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Get running balance and client account info for event
    const runningBalance = result.runningBalance?.toString() || "0";
    const clientAccountId = result.clientAccountId;
    const sourceRecordId = result.sourceRecordId;

    // Publish appropriate event based on transaction type
    if (result.type === "DEBIT") {
      ctx.pubsub.publish("billing.transaction.debited", {
        transactionId: result.id,
        clientId: clientAccountId,
        amount: result.amount.toString(),
        invoiceId: sourceRecordId || "",
        runningBalance,
      });
    } else if (result.type === "CREDIT") {
      ctx.pubsub.publish("billing.transaction.credited", {
        transactionId: result.id,
        clientId: clientAccountId,
        amount: result.amount.toString(),
        paymentId: sourceRecordId || "",
        runningBalance,
      });
    }

    return result as unknown as AccountTransactions;
  },
  updateAccountTransaction: async (_parent, args, ctx) => {
    const payload = UpdateAccountTransactionInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.accountTransactions")
      .set({
        ...payload,
        type: payload.type
          ? BillingTransactionTypeEnum[payload.type]
          : undefined,
      })
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
