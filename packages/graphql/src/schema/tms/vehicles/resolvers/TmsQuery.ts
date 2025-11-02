import { TmsVehicleStatusEnum } from "../../../../db.types";
import type { Vehicles } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<TmsQueryResolvers, "vehicle" | "vehicles"> = {
	vehicles: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("tms.vehicles").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.from && args.to) {
			query = query
				.clearLimit()
				.clearOffset()
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		if (args.search) {
			query = query.where((eb) =>
				eb.or([
					eb("registrationNumber", "ilike", `%${args.search}%`),
					eb("model", "ilike", `%${args.search}%`),
					eb("make", "ilike", `%${args.search}%`),
					eb("vin", "ilike", `%${args.search}%`),
				]),
			);
		}

		if (args.status) {
			query = query.where("status", "=", TmsVehicleStatusEnum[args.status]);
		}

		const results = await query.execute();

		return results as unknown as Vehicles[];
	},
	vehicle: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.vehicles")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as Vehicles;
	},
};
