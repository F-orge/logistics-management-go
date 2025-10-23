import {
  CreatePaymentInputSchema,
  Payments,
  UpdatePaymentInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<
  BillingMutationResolvers,
  "createPayment" | "removePayment" | "updatePayment"
> = {
  createPayment: async (_parent, args, ctx) => {
    const payload = CreatePaymentInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.payments")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Payments;
  },
  updatePayment: async (_parent, args, ctx) => {
    const payload = UpdatePaymentInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.payments")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Payments;
  },
  removePayment: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.payments")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
