import { TmsDriverScheduleReasonEnum } from "../../../../db.types";
import type { DriverSchedules } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";

export const TmsQuery: Pick<
	TmsQueryResolvers,
	"driverSchedule" | "driverSchedules"
> = {
	driverSchedules: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("tms.driverSchedules").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.driverId) {
			query = query.where("driverId", "=", args.driverId);
		}

		if (args.from && args.to) {
			query = query
				.where("startDate", ">=", args.from as Date)
				.where("endDate", "<=", args.to as Date);
		}

		if (args.reason) {
			query = query.where(
				"reason",
				"=",
				TmsDriverScheduleReasonEnum[args.reason],
			);
		}

		const results = await query.execute();

		return results as unknown as DriverSchedules[];
	},
	driverSchedule: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.driverSchedules")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as DriverSchedules;
	},
};
