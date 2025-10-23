import { PickBatches, SalesOrders } from "../../../../zod.schema";
import type { PickBatchItemsResolvers } from "./../../../types.generated";
export const PickBatchItems: PickBatchItemsResolvers = {
  pickBatch: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.pickBatches")
      .selectAll("wms.pickBatches")
      .innerJoin(
        "wms.pickBatchItems",
        "wms.pickBatchItems.pickBatchId",
        "wms.pickBatches.id"
      )
      .where("wms.pickBatchItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as PickBatches;
  },
  salesOrder: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.salesOrders")
      .selectAll("wms.salesOrders")
      .innerJoin(
        "wms.pickBatchItems",
        "wms.pickBatchItems.salesOrderId",
        "wms.salesOrders.id"
      )
      .where("wms.pickBatchItems.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as SalesOrders;
  },
};
