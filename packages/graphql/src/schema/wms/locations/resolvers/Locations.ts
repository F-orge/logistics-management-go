import type {
	BinThresholds,
	InventoryStock,
	Locations as ParentLocation,
	PutawayRules,
	TaskItems,
	Warehouses,
} from "../../../../zod.schema";
import type { LocationsResolvers } from "./../../../types.generated";
export const Locations: LocationsResolvers = {
	warehouse: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.warehouses")
			.selectAll("wms.warehouses")
			.innerJoin(
				"wms.locations",
				"wms.locations.warehouseId",
				"wms.warehouses.id",
			)
			.where("wms.locations.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Warehouses;
	},
	parentLocation: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.locations")
			.selectAll("wms.locations")
			.innerJoin(
				"wms.locations as childLocations",
				"childLocations.parentLocationId",
				"wms.locations.id",
			)
			.where("childLocations.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as ParentLocation;
	},
	inventoryStock: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.inventoryStock")
			.selectAll("wms.inventoryStock")
			.where("wms.inventoryStock.locationId", "=", parent.id as string)
			.execute();

		return results as unknown as InventoryStock[];
	},
	putawayRules: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.putawayRules")
			.selectAll("wms.putawayRules")
			.where("wms.putawayRules.preferredLocationId", "=", parent.id as string)
			.execute();

		return results as unknown as PutawayRules[];
	},
	binThresholds: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.binThresholds")
			.selectAll("wms.binThresholds")
			.where("wms.binThresholds.locationId", "=", parent.id as string)
			.execute();

		return results as unknown as BinThresholds[];
	},
	sourceTaskItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.taskItems")
			.selectAll("wms.taskItems")
			.where("wms.taskItems.sourceLocationId", "=", parent.id as string)
			.execute();

		return results as unknown as TaskItems[];
	},
	destinationTaskItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.taskItems")
			.selectAll("wms.taskItems")
			.where("wms.taskItems.destinationLocationId", "=", parent.id as string)
			.execute();

		return results as unknown as TaskItems[];
	},
};
