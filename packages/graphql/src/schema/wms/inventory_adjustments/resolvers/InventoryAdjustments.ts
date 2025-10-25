import { User, WmsProducts } from "../../../../zod.schema";
import type { InventoryAdjustmentsResolvers } from "./../../../types.generated";
export const InventoryAdjustments: InventoryAdjustmentsResolvers = {
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.inventoryAdjustments",
        "wms.inventoryAdjustments.productId",
        "wms.products.id"
      )
      .where("wms.inventoryAdjustments.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
  user: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin(
        "wms.inventoryAdjustments",
        "wms.inventoryAdjustments.userId",
        "user.id"
      )
      .where("wms.inventoryAdjustments.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
};
