import type { Warehouses, WmsProducts } from "../../../../zod.schema";
import type { StockTransfersResolvers } from "./../../../types.generated";
export const StockTransfers: StockTransfersResolvers = {
	product: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.products")
			.selectAll("wms.products")
			.innerJoin(
				"wms.stockTransfers",
				"wms.stockTransfers.productId",
				"wms.products.id",
			)
			.where("wms.stockTransfers.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as WmsProducts;
	},
	sourceWarehouse: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.warehouses")
			.selectAll("wms.warehouses")
			.innerJoin(
				"wms.stockTransfers",
				"wms.stockTransfers.sourceWarehouseId",
				"wms.warehouses.id",
			)
			.where("wms.stockTransfers.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Warehouses;
	},
	destinationWarehouse: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.warehouses")
			.selectAll("wms.warehouses")
			.innerJoin(
				"wms.stockTransfers",
				"wms.stockTransfers.destinationWarehouseId",
				"wms.warehouses.id",
			)
			.where("wms.stockTransfers.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Warehouses;
	},
};
