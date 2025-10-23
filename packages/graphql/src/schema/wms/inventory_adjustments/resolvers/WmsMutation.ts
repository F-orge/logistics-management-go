import {
  CreateInventoryAdjustmentInputSchema,
  InventoryAdjustments,
  UpdateInventoryAdjustmentInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createInventoryAdjustment'|'removeInventoryAdjustment'|'updateInventoryAdjustment'> = {
  createInventoryAdjustment: async (_parent, args, ctx) => {
    const payload = CreateInventoryAdjustmentInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.inventoryAdjustments")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InventoryAdjustments;
  },
  updateInventoryAdjustment: async (_parent, args, ctx) => {
    const payload = UpdateInventoryAdjustmentInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.inventoryAdjustments")
      .set(payload as any)
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
