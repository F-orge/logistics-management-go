import {
  OutboundShipmentItems,
  SalesOrders,
  WmsProducts,
} from "../../../../zod.schema";
import type { SalesOrderItemsResolvers } from "./../../../types.generated";
export const SalesOrderItems: SalesOrderItemsResolvers = {
  salesOrder: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.salesOrders")
      .selectAll("wms.salesOrders")
      .innerJoin(
        "wms.salesOrderItems",
        "wms.salesOrderItems.salesOrderId",
        "wms.salesOrders.id"
      )
      .where("wms.salesOrderItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as SalesOrders;
  },
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.salesOrderItems",
        "wms.salesOrderItems.productId",
        "wms.products.id"
      )
      .where("wms.salesOrderItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
  outboundShipmentItems: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.outboundShipmentItems")
      .selectAll("wms.outboundShipmentItems")
      .where(
        "wms.outboundShipmentItems.salesOrderItemId",
        "=",
        parent.id as string
      )
      .execute();

    return results as unknown as OutboundShipmentItems[];
  },
};
