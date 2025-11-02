import type { Drivers, Trips } from "../../../../zod.schema";
import type { ExpensesResolvers } from "./../../../types.generated";
export const Expenses: ExpensesResolvers = {
	trip: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.trips")
			.selectAll("tms.trips")
			.innerJoin("tms.expenses", "tms.expenses.tripId", "tms.trips.id")
			.where("tms.expenses.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Trips;
	},
	driver: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.drivers")
			.selectAll("tms.drivers")
			.innerJoin("tms.expenses", "tms.expenses.driverId", "tms.drivers.id")
			.where("tms.expenses.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Drivers;
	},
};
