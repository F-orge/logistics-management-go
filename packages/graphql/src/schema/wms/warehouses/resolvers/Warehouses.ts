import type {
	InboundShipments,
	Locations,
	OutboundShipments,
	Packages,
	PickBatches,
	PutawayRules,
	StockTransfers,
	Tasks,
} from "../../../../zod.schema";
import type { WarehousesResolvers } from "./../../../types.generated";
export const Warehouses: WarehousesResolvers = {
	inboundShipments: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.inboundShipments")
			.selectAll("wms.inboundShipments")
			.where("wms.inboundShipments.warehouseId", "=", parent.id as string)
			.execute();

		return results as unknown as InboundShipments[];
	},
	sourceStockTransfers: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.stockTransfers")
			.selectAll("wms.stockTransfers")
			.where("wms.stockTransfers.sourceWarehouseId", "=", parent.id as string)
			.execute();

		return results as unknown as StockTransfers[];
	},
	destinationStockTransfers: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.stockTransfers")
			.selectAll("wms.stockTransfers")
			.where(
				"wms.stockTransfers.destinationWarehouseId",
				"=",
				parent.id as string,
			)
			.execute();

		return results as unknown as StockTransfers[];
	},
	outboundShipments: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.outboundShipments")
			.selectAll("wms.outboundShipments")
			.where("wms.outboundShipments.warehouseId", "=", parent.id as string)
			.execute();

		return results as unknown as OutboundShipments[];
	},
	locations: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.locations")
			.selectAll("wms.locations")
			.where("wms.locations.warehouseId", "=", parent.id as string)
			.execute();

		return results as unknown as Locations[];
	},
	putawayRules: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.putawayRules")
			.selectAll("wms.putawayRules")
			.where("wms.putawayRules.warehouseId", "=", parent.id as string)
			.execute();

		return results as unknown as PutawayRules[];
	},
	pickBatches: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.pickBatches")
			.selectAll("wms.pickBatches")
			.where("wms.pickBatches.warehouseId", "=", parent.id as string)
			.execute();

		return results as unknown as PickBatches[];
	},
	tasks: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.tasks")
			.selectAll("wms.tasks")
			.where("wms.tasks.warehouseId", "=", parent.id as string)
			.execute();

		return results as unknown as Tasks[];
	},
	packages: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.packages")
			.selectAll("wms.packages")
			.where("wms.packages.warehouseId", "=", parent.id as string)
			.execute();

		return results as unknown as Packages[];
	},
};
