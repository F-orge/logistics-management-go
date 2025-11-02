import {
	CreateSalesOrderItemInputSchema,
	type SalesOrderItems,
	UpdateSalesOrderItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
	WmsMutationResolvers,
	"addSalesOrderItem" | "removeSalesOrderItem" | "updateSalesOrderItem"
> = {
	addSalesOrderItem: async (_parent, args, ctx) => {
		const payload = CreateSalesOrderItemInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("wms.salesOrderItems")
			.values({
				...payload,
				salesOrderId: args.id,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as SalesOrderItems;
	},

	updateSalesOrderItem: async (_parent, args, ctx) => {
		const payload = UpdateSalesOrderItemInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("wms.salesOrderItems")
			.set(payload)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as SalesOrderItems;
	},

	removeSalesOrderItem: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("wms.salesOrderItems")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
