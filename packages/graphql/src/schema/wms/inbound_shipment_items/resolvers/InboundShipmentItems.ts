import { InboundShipments, WmsProducts } from "../../../../zod.schema";
import type { InboundShipmentItemsResolvers } from "./../../../types.generated";
export const InboundShipmentItems: InboundShipmentItemsResolvers = {
  inboundShipment: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.inboundShipments")
      .selectAll("wms.inboundShipments")
      .innerJoin(
        "wms.inboundShipmentItems",
        "wms.inboundShipmentItems.inboundShipmentId",
        "wms.inboundShipments.id"
      )
      .where("wms.inboundShipmentItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as InboundShipments;
  },
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.inboundShipmentItems",
        "wms.inboundShipmentItems.productId",
        "wms.products.id"
      )
      .where("wms.inboundShipmentItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
};
