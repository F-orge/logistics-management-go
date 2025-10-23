import {
  CreateRateRuleInputSchema,
  RateRules,
  UpdateRateRuleInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<BillingMutationResolvers, 'createRateRule'|'removeRateRule'|'updateRateRule'> = {
  createRateRule: async (_parent, args, ctx) => {
    const payload = CreateRateRuleInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.rateRules")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as RateRules;
  },
  updateRateRule: async (_parent, args, ctx) => {
    const payload = UpdateRateRuleInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.rateRules")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as RateRules;
  },
  removeRateRule: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.rateRules")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
