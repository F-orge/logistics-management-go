import type { Warehouses, WmsProducts } from "../../../../zod.schema";
import type { ReorderPointsResolvers } from "./../../../types.generated";
export const ReorderPoints: ReorderPointsResolvers = {
	product: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.products")
			.selectAll("wms.products")
			.innerJoin(
				"wms.reorderPoints",
				"wms.reorderPoints.productId",
				"wms.products.id",
			)
			.where("wms.reorderPoints.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as WmsProducts;
	},
	warehouse: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.warehouses")
			.selectAll("wms.warehouses")
			.innerJoin(
				"wms.reorderPoints",
				"wms.reorderPoints.warehouseId",
				"wms.warehouses.id",
			)
			.where("wms.reorderPoints.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Warehouses;
	},
};
