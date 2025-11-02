import { WmsInventoryAdjustmentReasonEnum } from "../../../../db.types";
import {
	CreateInventoryAdjustmentInputSchema,
	type InventoryAdjustments,
	UpdateInventoryAdjustmentInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<
	WmsMutationResolvers,
	| "createInventoryAdjustment"
	| "removeInventoryAdjustment"
	| "updateInventoryAdjustment"
> = {
	createInventoryAdjustment: async (_parent, args, ctx) => {
		const payload = CreateInventoryAdjustmentInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("wms.inventoryAdjustments")
			.values({
				...payload,
				reason: payload.reason
					? WmsInventoryAdjustmentReasonEnum[payload.reason]
					: undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		// Get the previous quantity from the inventory stock
		const stock = await ctx.db
			.selectFrom("wms.inventoryStock")
			.select("quantity")
			.where("productId", "=", result.productId)
			.executeTakeFirst();

		const previousQuantity = stock ? stock.quantity - result.quantityChange : 0;

		// Publish recorded event
		await ctx.pubsub.publish("ims.inventoryAdjustment.recorded", {
			...result,
			previousQuantity,
		});

		return result as unknown as InventoryAdjustments;
	},
	updateInventoryAdjustment: async (_parent, args, ctx) => {
		const payload = UpdateInventoryAdjustmentInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("wms.inventoryAdjustments")
			.set({
				...payload,
				reason: payload.reason
					? WmsInventoryAdjustmentReasonEnum[payload.reason]
					: undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as InventoryAdjustments;
	},
	removeInventoryAdjustment: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("wms.inventoryAdjustments")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
