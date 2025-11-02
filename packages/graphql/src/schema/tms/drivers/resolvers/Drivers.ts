import {
  DeliveryRoutes,
  DriverLocations,
  DriverSchedules,
  Expenses,
  Trips,
  User,
} from "../../../../zod.schema";
import type { DriversResolvers } from "./../../../types.generated";
export const Drivers: DriversResolvers = {
  user: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin("tms.drivers", "tms.drivers.userId", "user.id")
      .where("tms.drivers.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
  schedules: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.driverSchedules")
      .selectAll("tms.driverSchedules")
      .where("tms.driverSchedules.driverId", "=", parent.id as string)
      .execute();

    return results as unknown as DriverSchedules[];
  },
  trips: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.trips")
      .selectAll("tms.trips")
      .where("tms.trips.driverId", "=", parent.id as string)
      .execute();

    return results as unknown as Trips[];
  },
  expenses: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.expenses")
      .selectAll("tms.expenses")
      .innerJoin("tms.trips", "tms.trips.id", "tms.expenses.tripId")
      .where("tms.trips.driverId", "=", parent.id as string)
      .execute();

    return results as unknown as Expenses[];
  },
  deliveryRoutes: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("dms.deliveryRoutes")
      .selectAll("dms.deliveryRoutes")
      .where("dms.deliveryRoutes.driverId", "=", parent.id as string)
      .execute();

    return results as unknown as DeliveryRoutes[];
  },
  driverLocations: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("dms.driverLocations")
      .selectAll("dms.driverLocations")
      .where("dms.driverLocations.driverId", "=", parent.id as string)
      .execute();

    return results as unknown as DriverLocations[];
  },
};
