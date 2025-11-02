import {
  InventoryBatches,
  Packages,
  WmsProducts,
} from "../../../../zod.schema";
import type { PackageItemsResolvers } from "./../../../types.generated";
export const PackageItems: PackageItemsResolvers = {
  package: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.packages")
      .selectAll("wms.packages")
      .innerJoin(
        "wms.packageItems",
        "wms.packageItems.packageId",
        "wms.packages.id"
      )
      .where("wms.packageItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Packages;
  },
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.packageItems",
        "wms.packageItems.productId",
        "wms.products.id"
      )
      .where("wms.packageItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
  batch: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.inventoryBatches")
      .selectAll("wms.inventoryBatches")
      .innerJoin(
        "wms.packageItems",
        "wms.packageItems.batchId",
        "wms.inventoryBatches.id"
      )
      .where("wms.packageItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as InventoryBatches;
  },
};
