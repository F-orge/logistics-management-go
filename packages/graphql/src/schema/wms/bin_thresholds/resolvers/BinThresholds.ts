import { WmsProducts } from "../../../../zod.schema";
import type { BinThresholdsResolvers } from "./../../../types.generated";
export const BinThresholds: BinThresholdsResolvers = {
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.binThresholds",
        "wms.binThresholds.productId",
        "wms.products.id"
      )
      .where("wms.binThresholds.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
};
