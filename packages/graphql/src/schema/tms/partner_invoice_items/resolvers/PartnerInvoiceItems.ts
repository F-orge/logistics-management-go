import { PartnerInvoices, ShipmentLegs } from "../../../../zod.schema";
import type { PartnerInvoiceItemsResolvers } from "./../../../types.generated";
export const PartnerInvoiceItems: PartnerInvoiceItemsResolvers = {
  partnerInvoice: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.partnerInvoices")
      .selectAll("tms.partnerInvoices")
      .innerJoin(
        "tms.partnerInvoiceItems",
        "tms.partnerInvoiceItems.partnerInvoiceId",
        "tms.partnerInvoices.id"
      )
      .where("tms.partnerInvoiceItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as PartnerInvoices;
  },
  shipmentLeg: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.shipmentLegs")
      .selectAll("tms.shipmentLegs")
      .innerJoin(
        "tms.partnerInvoiceItems",
        "tms.partnerInvoiceItems.shipmentLegId",
        "tms.shipmentLegs.id"
      )
      .where("tms.partnerInvoiceItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as ShipmentLegs;
  },
};
