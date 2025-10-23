import {
  InventoryBatches,
  Locations,
  WmsProducts,
} from "../../../../zod.schema";
import type { InventoryStockResolvers } from "./../../../types.generated";
export const InventoryStock: InventoryStockResolvers = {
  location: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.locations")
      .selectAll("wms.locations")
      .innerJoin(
        "wms.inventoryStock",
        "wms.inventoryStock.locationId",
        "wms.locations.id"
      )
      .where("wms.inventoryStock.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Locations;
  },
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.inventoryStock",
        "wms.inventoryStock.productId",
        "wms.products.id"
      )
      .where("wms.inventoryStock.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
  batch: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.inventoryBatches")
      .selectAll("wms.inventoryBatches")
      .innerJoin(
        "wms.inventoryStock",
        "wms.inventoryStock.batchId",
        "wms.inventoryBatches.id"
      )
      .where("wms.inventoryStock.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as InventoryBatches;
  },
};
