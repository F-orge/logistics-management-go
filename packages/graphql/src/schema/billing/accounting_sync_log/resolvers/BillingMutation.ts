import {
  AccountingSyncLogs,
  CreateAccountingSyncLogInputSchema,
  UpdateAccountingSyncLogInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<BillingMutationResolvers, 'createAccountingSyncLog'|'removeAccountingSyncLog'|'updateAccountingSyncLog'> = {
  createAccountingSyncLog: async (_parent, args, ctx) => {
    const payload = CreateAccountingSyncLogInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.accountingSyncLog")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as AccountingSyncLogs;
  },
  updateAccountingSyncLog: async (_parent, args, ctx) => {
    const payload = UpdateAccountingSyncLogInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.accountingSyncLog")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as AccountingSyncLogs;
  },
  removeAccountingSyncLog: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.accountingSyncLog")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
