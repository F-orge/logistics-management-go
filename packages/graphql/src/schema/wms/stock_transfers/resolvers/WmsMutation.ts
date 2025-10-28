import { WmsStockTransferStatusEnum } from "../../../../db.types";
import {
  CreateStockTransferInputSchema,
  StockTransfers,
  UpdateStockTransferInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<WmsMutationResolvers, 'createStockTransfer'|'removeStockTransfer'|'updateStockTransfer'> = {
  createStockTransfer: async (_parent, args, ctx) => {
    const payload = CreateStockTransferInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.stockTransfers")
      .values({
        ...payload,
        status: payload.status
          ? WmsStockTransferStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish initiated event
    await ctx.pubsub.publish("wms.stockTransfer.initiated", result);

    return result as unknown as StockTransfers;
  },
  updateStockTransfer: async (_parent, args, ctx) => {
    const payload = UpdateStockTransferInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousTransfer = await ctx.db
      .selectFrom("wms.stockTransfers")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("wms.stockTransfers")
      .set({
        ...payload,
        status: payload.status
          ? WmsStockTransferStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousTransfer.status) {
      const status = payload.status as WmsStockTransferStatusEnum;

      await ctx.pubsub.publish("wms.stockTransfer.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousTransfer.status as WmsStockTransferStatusEnum,
        productId: result.productId,
      });

      // Publish specific status events
      if (status === "IN_TRANSIT") {
        await ctx.pubsub.publish("wms.stockTransfer.inTransit", result);
      } else if (status === "RECEIVED") {
        await ctx.pubsub.publish("wms.stockTransfer.received", result);
      }
    }

    return result as unknown as StockTransfers;
  },
  removeStockTransfer: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.stockTransfers")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
