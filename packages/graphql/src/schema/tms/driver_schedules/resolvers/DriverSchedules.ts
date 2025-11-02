import type { Drivers } from "../../../../zod.schema";
import type { DriverSchedulesResolvers } from "./../../../types.generated";
export const DriverSchedules: DriverSchedulesResolvers = {
	driver: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.drivers")
			.selectAll("tms.drivers")
			.innerJoin(
				"tms.driverSchedules",
				"tms.driverSchedules.driverId",
				"tms.drivers.id",
			)
			.where("tms.driverSchedules.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Drivers;
	},
};
