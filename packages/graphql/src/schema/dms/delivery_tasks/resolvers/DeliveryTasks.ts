import type {
	CustomerTrackingLinks,
	DeliveryRoutes,
	DmsProofOfDeliveries,
	Packages,
	TaskEvents,
} from "../../../../zod.schema";
import type { DeliveryTasksResolvers } from "./../../../types.generated";
export const DeliveryTasks: DeliveryTasksResolvers = {
	customerTrackingLinks: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("dms.customerTrackingLinks")
			.selectAll("dms.customerTrackingLinks")
			.where(
				"dms.customerTrackingLinks.deliveryTaskId",
				"=",
				parent.id as string,
			)
			.execute();

		return results as unknown as CustomerTrackingLinks[];
	},
	deliveryRoute: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("dms.deliveryRoutes")
			.selectAll("dms.deliveryRoutes")
			.innerJoin(
				"dms.deliveryTasks",
				"dms.deliveryTasks.deliveryRouteId",
				"dms.deliveryRoutes.id",
			)
			.where("dms.deliveryTasks.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as DeliveryRoutes;
	},
	events: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("dms.taskEvents")
			.selectAll("dms.taskEvents")
			.innerJoin(
				"dms.deliveryTasks",
				"dms.deliveryTasks.id",
				"dms.taskEvents.deliveryTaskId",
			)
			.where("dms.deliveryTasks.id", "=", parent.id as string)
			.execute();

		return result as unknown as TaskEvents[];
	},
	package: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.packages")
			.selectAll("wms.packages")
			.innerJoin(
				"dms.deliveryTasks",
				"dms.deliveryTasks.packageId",
				"wms.packages.id",
			)
			.where("dms.deliveryTasks.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Packages;
	},
	proofOfDeliveries: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("dms.proofOfDeliveries")
			.selectAll("dms.proofOfDeliveries")
			.where("dms.proofOfDeliveries.deliveryTaskId", "=", parent.id as string)
			.execute();

		return results as unknown as DmsProofOfDeliveries[];
	},
};
