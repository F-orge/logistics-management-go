import {
  InventoryBatches,
  OutboundShipments,
  SalesOrderItems,
  WmsProducts,
} from "../../../../zod.schema";
import type { OutboundShipmentItemsResolvers } from "./../../../types.generated";
export const OutboundShipmentItems: OutboundShipmentItemsResolvers = {
  outboundShipment: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.outboundShipments")
      .selectAll("wms.outboundShipments")
      .innerJoin(
        "wms.outboundShipmentItems",
        "wms.outboundShipmentItems.outboundShipmentId",
        "wms.outboundShipments.id"
      )
      .where("wms.outboundShipmentItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as OutboundShipments;
  },
  salesOrderItem: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.salesOrderItems")
      .selectAll("wms.salesOrderItems")
      .innerJoin(
        "wms.outboundShipmentItems",
        "wms.outboundShipmentItems.salesOrderItemId",
        "wms.salesOrderItems.id"
      )
      .where("wms.outboundShipmentItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as SalesOrderItems;
  },
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.outboundShipmentItems",
        "wms.outboundShipmentItems.productId",
        "wms.products.id"
      )
      .where("wms.outboundShipmentItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
  batch: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.inventoryBatches")
      .selectAll("wms.inventoryBatches")
      .innerJoin(
        "wms.outboundShipmentItems",
        "wms.outboundShipmentItems.batchId",
        "wms.inventoryBatches.id"
      )
      .where("wms.outboundShipmentItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as InventoryBatches;
  },
};
