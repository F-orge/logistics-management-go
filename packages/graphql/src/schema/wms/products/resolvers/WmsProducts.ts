import type {
	BinThresholds,
	Companies,
	InboundShipmentItems,
	InventoryAdjustments,
	InventoryBatches,
	InventoryStock,
	OutboundShipmentItems,
	PackageItems,
	PutawayRules,
	ReorderPoints,
	ReturnItems,
	SalesOrderItems,
	StockTransfers,
	Suppliers,
	TaskItems,
} from "../../../../zod.schema";
import type { WmsProductsResolvers } from "./../../../types.generated";
export const WmsProducts: WmsProductsResolvers = {
	supplier: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.suppliers")
			.selectAll("wms.suppliers")
			.innerJoin("wms.products", "wms.products.supplierId", "wms.suppliers.id")
			.where("wms.products.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Suppliers;
	},
	client: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.companies")
			.selectAll("crm.companies")
			.innerJoin("wms.products", "wms.products.clientId", "crm.companies.id")
			.where("wms.products.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Companies;
	},
	batches: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.inventoryBatches")
			.selectAll("wms.inventoryBatches")
			.where("wms.inventoryBatches.productId", "=", parent.id as string)
			.execute();

		return results as unknown as InventoryBatches[];
	},
	adjustments: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.inventoryAdjustments")
			.selectAll("wms.inventoryAdjustments")
			.where("wms.inventoryAdjustments.productId", "=", parent.id as string)
			.execute();

		return results as unknown as InventoryAdjustments[];
	},
	reorderPoints: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.reorderPoints")
			.selectAll("wms.reorderPoints")
			.where("wms.reorderPoints.productId", "=", parent.id as string)
			.execute();

		return results as unknown as ReorderPoints[];
	},
	inboundShipmentItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.inboundShipmentItems")
			.selectAll("wms.inboundShipmentItems")
			.where("wms.inboundShipmentItems.productId", "=", parent.id as string)
			.execute();

		return results as unknown as InboundShipmentItems[];
	},
	stockTransfers: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.stockTransfers")
			.selectAll("wms.stockTransfers")
			.where("wms.stockTransfers.productId", "=", parent.id as string)
			.execute();

		return results as unknown as StockTransfers[];
	},
	salesOrderItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.salesOrderItems")
			.selectAll("wms.salesOrderItems")
			.where("wms.salesOrderItems.productId", "=", parent.id as string)
			.execute();

		return results as unknown as SalesOrderItems[];
	},
	outboundShipmentItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.outboundShipmentItems")
			.selectAll("wms.outboundShipmentItems")
			.where("wms.outboundShipmentItems.productId", "=", parent.id as string)
			.execute();

		return results as unknown as OutboundShipmentItems[];
	},
	returnItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.returnItems")
			.selectAll("wms.returnItems")
			.where("wms.returnItems.productId", "=", parent.id as string)
			.execute();

		return results as unknown as ReturnItems[];
	},
	inventoryStock: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.inventoryStock")
			.selectAll("wms.inventoryStock")
			.where("wms.inventoryStock.productId", "=", parent.id as string)
			.execute();

		return results as unknown as InventoryStock[];
	},
	putawayRules: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.putawayRules")
			.selectAll("wms.putawayRules")
			.where("wms.putawayRules.productId", "=", parent.id as string)
			.execute();

		return results as unknown as PutawayRules[];
	},
	binThresholds: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.binThresholds")
			.selectAll("wms.binThresholds")
			.where("wms.binThresholds.productId", "=", parent.id as string)
			.execute();

		return results as unknown as BinThresholds[];
	},
	taskItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.taskItems")
			.selectAll("wms.taskItems")
			.where("wms.taskItems.productId", "=", parent.id as string)
			.execute();

		return results as unknown as TaskItems[];
	},
	packageItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.packageItems")
			.selectAll("wms.packageItems")
			.where("wms.packageItems.productId", "=", parent.id as string)
			.execute();

		return results as unknown as PackageItems[];
	},
};
