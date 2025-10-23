import { PartnerInvoices, ShipmentLegs } from "../../../../zod.schema";
import type { CarriersResolvers } from "./../../../types.generated";
export const Carriers: CarriersResolvers = {
  partnerInvoices: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.partnerInvoices")
      .selectAll("tms.partnerInvoices")
      .where("tms.partnerInvoices.carrierId", "=", parent.id as string)
      .execute();

    return results as unknown as PartnerInvoices[];
  },
  shipmentLegs: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.shipmentLegs")
      .selectAll("tms.shipmentLegs")
      .where("tms.shipmentLegs.carrierId", "=", parent.id as string)
      .execute();

    return results as unknown as ShipmentLegs[];
  },
};
