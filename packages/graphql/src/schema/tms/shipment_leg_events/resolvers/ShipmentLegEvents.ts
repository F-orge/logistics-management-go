import { ShipmentLegs } from "../../../../zod.schema";
import type { ShipmentLegEventsResolvers } from "./../../../types.generated";
export const ShipmentLegEvents: ShipmentLegEventsResolvers = {
  shipmentLeg: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.shipmentLegs")
      .selectAll("tms.shipmentLegs")
      .innerJoin(
        "tms.shipmentLegEvents",
        "tms.shipmentLegEvents.shipmentLegId",
        "tms.shipmentLegs.id"
      )
      .where("tms.shipmentLegEvents.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as ShipmentLegs;
  },
};
