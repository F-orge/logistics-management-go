import type { Carriers } from "../../../../zod.schema";
import type { CarrierRatesResolvers } from "./../../../types.generated";
export const CarrierRates: CarrierRatesResolvers = {
	carrier: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.carriers")
			.selectAll("tms.carriers")
			.innerJoin(
				"tms.carrierRates",
				"tms.carrierRates.carrierId",
				"tms.carriers.id",
			)
			.where("tms.carrierRates.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Carriers;
	},
};
