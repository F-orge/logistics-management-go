import type {
	DeliveryTasks,
	PackageItems,
	SalesOrders,
	Warehouses,
} from "../../../../zod.schema";
import type { PackagesResolvers } from "./../../../types.generated";

export const Packages: PackagesResolvers = {
	salesOrder: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.salesOrders")
			.selectAll("wms.salesOrders")
			.innerJoin(
				"wms.packages",
				"wms.packages.salesOrderId",
				"wms.salesOrders.id",
			)
			.where("wms.packages.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as SalesOrders;
	},
	warehouse: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.warehouses")
			.selectAll("wms.warehouses")
			.innerJoin(
				"wms.packages",
				"wms.packages.warehouseId",
				"wms.warehouses.id",
			)
			.where("wms.packages.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Warehouses;
	},
	items: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.packageItems")
			.selectAll("wms.packageItems")
			.where("wms.packageItems.packageId", "=", parent.id as string)
			.execute();

		return results as unknown as PackageItems[];
	},
	deliveryTasks: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("dms.deliveryTasks")
			.selectAll("dms.deliveryTasks")
			.where("dms.deliveryTasks.packageId", "=", parent.id as string)
			.execute();

		return results as unknown as DeliveryTasks[];
	},
};
