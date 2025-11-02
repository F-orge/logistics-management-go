import type {
	Drivers,
	Expenses,
	Routes,
	ShipmentLegs,
	TripStops,
	Vehicles,
} from "../../../../zod.schema";
import type { TripsResolvers } from "./../../../types.generated";
export const Trips: TripsResolvers = {
	driver: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.drivers")
			.selectAll("tms.drivers")
			.innerJoin("tms.trips", "tms.trips.driverId", "tms.drivers.id")
			.where("tms.trips.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Drivers;
	},
	vehicle: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.vehicles")
			.selectAll("tms.vehicles")
			.innerJoin("tms.trips", "tms.trips.vehicleId", "tms.vehicles.id")
			.where("tms.trips.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Vehicles;
	},
	stops: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("tms.tripStops")
			.selectAll("tms.tripStops")
			.innerJoin("tms.trips", "tms.trips.id", "tms.tripStops.tripId")
			.where("tms.tripStops.tripId", "=", parent.id as string)
			.orderBy("tms.tripStops.sequence", "asc")
			.execute();

		return results as unknown as TripStops[];
	},
	routes: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("tms.routes")
			.selectAll("tms.routes")
			.where("tms.routes.tripId", "=", parent.id as string)
			.execute();

		return results as unknown as Routes[];
	},
	expenses: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("tms.expenses")
			.selectAll("tms.expenses")
			.where("tms.expenses.tripId", "=", parent.id as string)
			.execute();

		return results as unknown as Expenses[];
	},
	shipmentLegs: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("tms.shipmentLegs")
			.selectAll("tms.shipmentLegs")
			.where("tms.shipmentLegs.internalTripId", "=", parent.id as string)
			.execute();

		return results as unknown as ShipmentLegs[];
	},
};
