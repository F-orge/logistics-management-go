import type { TripStops } from "../../../../zod.schema";
import type { ProofOfDeliveriesResolvers } from "./../../../types.generated";
export const ProofOfDeliveries: ProofOfDeliveriesResolvers = {
	tripStop: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.tripStops")
			.selectAll("tms.tripStops")
			.innerJoin(
				"tms.proofOfDeliveries",
				"tms.proofOfDeliveries.tripStopId",
				"tms.tripStops.id",
			)
			.where("tms.proofOfDeliveries.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as TripStops;
	},
};
