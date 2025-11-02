import { Companies, InboundShipmentItems } from "../../../../zod.schema";
import type { InboundShipmentsResolvers } from "./../../../types.generated";
export const InboundShipments: InboundShipmentsResolvers = {
  client: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.companies")
      .selectAll("crm.companies")
      .innerJoin(
        "wms.inboundShipments",
        "wms.inboundShipments.clientId",
        "crm.companies.id"
      )
      .where("wms.inboundShipments.id", "=", parent.id as string)
      .executeTakeFirst();
    return result as unknown as Companies;
  },
  items: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.inboundShipmentItems")
      .selectAll("wms.inboundShipmentItems")
      .where(
        "wms.inboundShipmentItems.inboundShipmentId",
        "=",
        parent.id as string
      )
      .execute();

    return results as unknown as InboundShipmentItems[];
  },
};
