import type {
	InventoryStock,
	OutboundShipmentItems,
	PackageItems,
	TaskItems,
	WmsProducts,
} from "../../../../zod.schema";
import type { InventoryBatchesResolvers } from "./../../../types.generated";
export const InventoryBatches: InventoryBatchesResolvers = {
	product: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.products")
			.selectAll("wms.products")
			.innerJoin(
				"wms.inventoryBatches",
				"wms.inventoryBatches.productId",
				"wms.products.id",
			)
			.where("wms.inventoryBatches.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as WmsProducts;
	},
	outboundShipmentItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.outboundShipmentItems")
			.selectAll("wms.outboundShipmentItems")
			.where("wms.outboundShipmentItems.batchId", "=", parent.id as string)
			.execute();

		return results as unknown as OutboundShipmentItems[];
	},
	inventoryStock: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.inventoryStock")
			.selectAll("wms.inventoryStock")
			.where("wms.inventoryStock.batchId", "=", parent.id as string)
			.execute();

		return results as unknown as InventoryStock[];
	},
	taskItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.taskItems")
			.selectAll("wms.taskItems")
			.where("wms.taskItems.batchId", "=", parent.id as string)
			.execute();

		return results as unknown as TaskItems[];
	},
	packageItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.packageItems")
			.selectAll("wms.packageItems")
			.where("wms.packageItems.batchId", "=", parent.id as string)
			.execute();

		return results as unknown as PackageItems[];
	},
};
