import type {
	PickBatchItems,
	Tasks,
	User,
	Warehouses,
} from "../../../../zod.schema";
import type { PickBatchesResolvers } from "./../../../types.generated";
export const PickBatches: PickBatchesResolvers = {
	warehouse: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.warehouses")
			.selectAll("wms.warehouses")
			.innerJoin(
				"wms.pickBatches",
				"wms.pickBatches.warehouseId",
				"wms.warehouses.id",
			)
			.where("wms.pickBatches.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Warehouses;
	},
	assignedUser: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("user")
			.selectAll("user")
			.innerJoin("wms.pickBatches", "wms.pickBatches.assignedUserId", "user.id")
			.where("wms.pickBatches.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as User;
	},
	items: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.pickBatchItems")
			.selectAll("wms.pickBatchItems")
			.where("wms.pickBatchItems.pickBatchId", "=", parent.id as string)
			.execute();

		return results as unknown as PickBatchItems[];
	},
	tasks: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.tasks")
			.selectAll("wms.tasks")
			.where("wms.tasks.pickBatchId", "=", parent.id as string)
			.execute();

		return results as unknown as Tasks[];
	},
};
