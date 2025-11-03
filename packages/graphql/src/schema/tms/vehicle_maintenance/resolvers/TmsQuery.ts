import { TmsVehicleServiceTypeEnum } from "../../../../db.types";
import type { VehicleMaintenance } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";

export const TmsQuery: Pick<
	TmsQueryResolvers,
	"vehicleMaintenance" | "vehicleMaintenances"
> = {
	vehicleMaintenances: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("tms.vehicleMaintenance").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.vehicleId) {
			query = query.where("vehicleId", "=", args.vehicleId);
		}

		if (args.from && args.to) {
			query = query
				.where("serviceDate", ">=", args.from as Date)
				.where("serviceDate", "<=", args.to as Date);
		}

		if (args.serviceType) {
			query = query.where(
				"serviceType",
				"=",
				TmsVehicleServiceTypeEnum[args.serviceType],
			);
		}

		const results = await query.execute();

		return results as unknown as VehicleMaintenance[];
	},
	vehicleMaintenance: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.vehicleMaintenance")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as VehicleMaintenance;
	},
};
