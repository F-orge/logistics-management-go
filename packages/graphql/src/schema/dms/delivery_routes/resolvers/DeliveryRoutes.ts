import { DeliveryTasks, Drivers } from "../../../../zod.schema";
import type { DeliveryRoutesResolvers } from "./../../../types.generated";
export const DeliveryRoutes: DeliveryRoutesResolvers = {
  driver: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.drivers")
      .selectAll("tms.drivers")
      .innerJoin(
        "dms.deliveryRoutes",
        "dms.deliveryRoutes.driverId",
        "tms.drivers.id"
      )
      .where("dms.deliveryRoutes.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Drivers;
  },
  tasks: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("dms.deliveryTasks")
      .selectAll("dms.deliveryTasks")
      .where("dms.deliveryTasks.deliveryRouteId", "=", parent.id as string)
      .execute();

    return results as unknown as DeliveryTasks[];
  },
};
