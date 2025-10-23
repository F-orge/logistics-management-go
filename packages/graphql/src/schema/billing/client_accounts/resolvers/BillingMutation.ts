import {
  ClientAccounts,
  CreateClientAccountInputSchema,
  UpdateClientAccountInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<
  BillingMutationResolvers,
  "createClientAccount" | "removeClientAccount" | "updateClientAccount"
> = {
  createClientAccount: async (_parent, args, ctx) => {
    const payload = CreateClientAccountInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.clientAccounts")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ClientAccounts;
  },
  updateClientAccount: async (_parent, args, ctx) => {
    const payload = UpdateClientAccountInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.clientAccounts")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ClientAccounts;
  },
  removeClientAccount: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.clientAccounts")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
