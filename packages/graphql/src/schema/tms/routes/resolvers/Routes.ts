import type { Trips } from "../../../../zod.schema";
import type { RoutesResolvers } from "./../../../types.generated";
export const Routes: RoutesResolvers = {
	trip: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.trips")
			.selectAll("tms.trips")
			.innerJoin("tms.routes", "tms.routes.tripId", "tms.trips.id")
			.where("tms.routes.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Trips;
	},
};
