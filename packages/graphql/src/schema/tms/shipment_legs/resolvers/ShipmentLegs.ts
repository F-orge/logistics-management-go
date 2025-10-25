import {
  Carriers,
  OutboundShipments,
  PartnerInvoiceItems,
  ShipmentLegEvents,
  Trips,
} from "../../../../zod.schema";
import type { ShipmentLegsResolvers } from "./../../../types.generated";
export const ShipmentLegs: ShipmentLegsResolvers = {
  carrier: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.carriers")
      .selectAll("tms.carriers")
      .innerJoin(
        "tms.shipmentLegs",
        "tms.shipmentLegs.carrierId",
        "tms.carriers.id"
      )
      .where("tms.shipmentLegs.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Carriers;
  },
  shipment: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.outboundShipments")
      .selectAll("wms.outboundShipments")
      .innerJoin(
        "tms.shipmentLegs",
        "tms.shipmentLegs.shipmentId",
        "wms.outboundShipments.id"
      )
      .where("tms.shipmentLegs.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as OutboundShipments;
  },
  events: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.shipmentLegEvents")
      .selectAll("tms.shipmentLegEvents")
      .where("tms.shipmentLegEvents.shipmentLegId", "=", parent.id as string)
      .execute();

    return results as unknown as ShipmentLegEvents[];
  },
  partnerInvoiceItems: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.partnerInvoiceItems")
      .selectAll("tms.partnerInvoiceItems")
      .where("tms.partnerInvoiceItems.shipmentLegId", "=", parent.id as string)
      .execute();

    return results as unknown as PartnerInvoiceItems[];
  },
  internalTrip: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.trips")
      .selectAll("tms.trips")
      .innerJoin(
        "tms.shipmentLegs",
        "tms.shipmentLegs.internalTripId",
        "tms.trips.id"
      )
      .where("tms.shipmentLegs.id", "=", parent.id as string)
      .executeTakeFirst();

    return results as unknown as Trips;
  },
};
