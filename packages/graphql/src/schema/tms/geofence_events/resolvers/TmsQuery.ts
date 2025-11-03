import { TmsGeofenceEventTypeEnum } from "../../../../db.types";
import type { GeofenceEvents } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";

export const TmsQuery: Pick<
	TmsQueryResolvers,
	"geofenceEvents" | "geofenceEvent"
> = {
	geofenceEvents: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("tms.geofenceEvents").selectAll();

		if (args.geofenceId) {
			query = query.where("geofenceId", "=", args.geofenceId);
		}

		if (args.vehicleId) {
			query = query.where("vehicleId", "=", args.vehicleId);
		}

		if (args.eventType) {
			query = query.where(
				"eventType",
				"=",
				TmsGeofenceEventTypeEnum[args.eventType],
			);
		}

		if (args.from && args.to) {
			query = query
				.where("timestamp", ">=", args.from as Date)
				.where("timestamp", "<=", args.to as Date);
		}

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		const results = await query.execute();

		return results as unknown as GeofenceEvents[];
	},
	geofenceEvent: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.geofenceEvents")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as GeofenceEvents;
	},
};
