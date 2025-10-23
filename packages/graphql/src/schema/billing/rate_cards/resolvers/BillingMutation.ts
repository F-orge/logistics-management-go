import {
  CreateRateCardInputSchema,
  RateCards,
  UpdateRateCardInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<
  BillingMutationResolvers,
  "createRateCard" | "removeRateCard" | "updateRateCard"
> = {
  createRateCard: async (_parent, args, ctx) => {
    const payload = CreateRateCardInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.rateCards")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as RateCards;
  },
  updateRateCard: async (_parent, args, ctx) => {
    const payloada = UpdateRateCardInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.rateCards")
      .set(payloada as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as RateCards;
  },
  removeRateCard: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.rateCards")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
