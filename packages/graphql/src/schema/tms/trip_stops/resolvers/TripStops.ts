import { OutboundShipments, ProofOfDeliveries } from "../../../../zod.schema";
import type { TripStopsResolvers } from "./../../../types.generated";
export const TripStops: TripStopsResolvers = {
  shipment: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.outboundShipments")
      .selectAll("wms.outboundShipments")
      .innerJoin(
        "tms.tripStops",
        "tms.tripStops.shipmentId",
        "wms.outboundShipments.id"
      )
      .where("tms.tripStops.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as OutboundShipments;
  },
  proofOfDeliveries: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.proofOfDeliveries")
      .selectAll("tms.proofOfDeliveries")
      .where("tms.proofOfDeliveries.tripStopId", "=", parent.id as string)
      .execute();

    return results as unknown as ProofOfDeliveries[];
  },
};
