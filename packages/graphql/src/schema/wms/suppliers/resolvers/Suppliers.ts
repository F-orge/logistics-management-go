import { WmsProducts } from "../../../../zod.schema";
import type { SuppliersResolvers } from "./../../../types.generated";
export const Suppliers: SuppliersResolvers = {
  products: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .where("wms.products.supplierId", "=", parent.id as string)
      .execute();

    return results as unknown as WmsProducts[];
  },
};
