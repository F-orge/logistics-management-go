import { Returns, WmsProducts } from "../../../../zod.schema";
import type { ReturnItemsResolvers } from "./../../../types.generated";
export const ReturnItems: ReturnItemsResolvers = {
  return: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.returns")
      .selectAll("wms.returns")
      .innerJoin(
        "wms.returnItems",
        "wms.returnItems.returnId",
        "wms.returns.id"
      )
      .where("wms.returnItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Returns;
  },
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.returnItems",
        "wms.returnItems.productId",
        "wms.products.id"
      )
      .where("wms.returnItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
};
