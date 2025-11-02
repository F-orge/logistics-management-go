import type { Drivers } from "../../../../zod.schema";
import type { DriverLocationsResolvers } from "./../../../types.generated";
export const DriverLocations: DriverLocationsResolvers = {
	driver: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.drivers")
			.selectAll("tms.drivers")
			.innerJoin(
				"dms.driverLocations",
				"dms.driverLocations.driverId",
				"tms.drivers.id",
			)
			.where("dms.driverLocations.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Drivers;
	},
};
