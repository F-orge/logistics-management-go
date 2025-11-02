import { WmsInventoryStockStatusEnum } from "../../../../db.types";
import {
  CreateInventoryStockInputSchema,
  InventoryStock,
  UpdateInventoryStockInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<WmsMutationResolvers, 'createInventoryStock'|'removeInventoryStock'|'updateInventoryStock'> = {
  createInventoryStock: async (_parent, args, ctx) => {
    const payload = CreateInventoryStockInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.inventoryStock")
      .values({
        ...payload,
        status: payload.status
          ? WmsInventoryStockStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InventoryStock;
  },
  updateInventoryStock: async (_parent, args, ctx) => {
    const payload = UpdateInventoryStockInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousStock = await ctx.db
      .selectFrom("wms.inventoryStock")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("wms.inventoryStock")
      .set({
        ...payload,
        status: payload.status
          ? WmsInventoryStockStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousStock.status) {
      await ctx.pubsub.publish("ims.inventoryStock.statusChanged", {
        id: result.id,
        newStatus: payload.status as WmsInventoryStockStatusEnum,
        previousStatus: previousStock.status as WmsInventoryStockStatusEnum,
        productId: result.productId,
        locationId: result.locationId,
        quantity: result.quantity,
      });
    }

    return result as unknown as InventoryStock;
  },
  removeInventoryStock: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.inventoryStock")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
