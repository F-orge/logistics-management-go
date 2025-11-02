import { RateRules, User } from "../../../../zod.schema";
import type { RateCardsResolvers } from "./../../../types.generated";
export const RateCards: RateCardsResolvers = {
  createdByUser: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin(
        "billing.rateCards",
        "billing.rateCards.createdByUserId",
        "user.id"
      )
      .where("billing.rateCards.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
  rules: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("billing.rateRules")
      .selectAll("billing.rateRules")
      .where("billing.rateRules.rateCardId", "=", parent.id as string)
      .execute();

    return results as unknown as RateRules[];
  },
};
