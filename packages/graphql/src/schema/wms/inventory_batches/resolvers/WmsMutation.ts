import {
  CreateInventoryBatchInputSchema,
  InventoryBatches,
  UpdateInventoryBatchInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createInventoryBatch" | "removeInventoryBatch" | "updateInventoryBatch"
> = {
  createInventoryBatch: async (_parent, args, ctx) => {
    const payload = CreateInventoryBatchInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.inventoryBatches")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as InventoryBatches;
  },
  updateInventoryBatch: async (_parent, args, ctx) => {
    const payload = UpdateInventoryBatchInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.inventoryBatches")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InventoryBatches;
  },
  removeInventoryBatch: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.inventoryBatches")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
