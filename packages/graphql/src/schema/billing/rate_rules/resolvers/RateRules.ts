import type { RateCards } from "../../../../zod.schema";
import type { RateRulesResolvers } from "./../../../types.generated";
export const RateRules: RateRulesResolvers = {
	rateCard: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("billing.rateCards")
			.selectAll("billing.rateCards")
			.innerJoin(
				"billing.rateRules",
				"billing.rateRules.rateCardId",
				"billing.rateCards.id",
			)
			.where("billing.rateRules.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as RateCards;
	},
};
