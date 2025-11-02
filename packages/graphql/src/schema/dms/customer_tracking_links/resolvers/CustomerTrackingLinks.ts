import type { DeliveryTasks } from "../../../../zod.schema";
import type { CustomerTrackingLinksResolvers } from "./../../../types.generated";
export const CustomerTrackingLinks: CustomerTrackingLinksResolvers = {
	deliveryTask: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("dms.deliveryTasks")
			.selectAll("dms.deliveryTasks")
			.innerJoin(
				"dms.customerTrackingLinks",
				"dms.customerTrackingLinks.deliveryTaskId",
				"dms.deliveryTasks.id",
			)
			.where("dms.customerTrackingLinks.id", "=", parent.id as string)
			.executeTakeFirstOrThrow();

		return result as unknown as DeliveryTasks;
	},
};
