import type {
	InventoryBatches,
	Locations,
	Tasks,
	WmsProducts,
} from "../../../../zod.schema";
import type { TaskItemsResolvers } from "./../../../types.generated";
export const TaskItems: TaskItemsResolvers = {
	task: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.tasks")
			.selectAll("wms.tasks")
			.innerJoin("wms.taskItems", "wms.taskItems.taskId", "wms.tasks.id")
			.where("wms.taskItems.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Tasks;
	},
	product: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.products")
			.selectAll("wms.products")
			.innerJoin("wms.taskItems", "wms.taskItems.productId", "wms.products.id")
			.where("wms.taskItems.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as WmsProducts;
	},
	batch: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.inventoryBatches")
			.selectAll("wms.inventoryBatches")
			.innerJoin(
				"wms.taskItems",
				"wms.taskItems.batchId",
				"wms.inventoryBatches.id",
			)
			.where("wms.taskItems.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as InventoryBatches;
	},
	sourceLocation: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.locations")
			.selectAll("wms.locations")
			.innerJoin(
				"wms.taskItems",
				"wms.taskItems.sourceLocationId",
				"wms.locations.id",
			)
			.where("wms.taskItems.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Locations;
	},
	destinationLocation: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.locations")
			.selectAll("wms.locations")
			.innerJoin(
				"wms.taskItems",
				"wms.taskItems.destinationLocationId",
				"wms.locations.id",
			)
			.where("wms.taskItems.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Locations;
	},
};
