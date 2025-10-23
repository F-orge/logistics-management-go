import {
  CreateInventoryStockInputSchema,
  InventoryStock,
  UpdateInventoryStockInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createInventoryStock" | "removeInventoryStock" | "updateInventoryStock"
> = {
  createInventoryStock: async (_parent, args, ctx) => {
    const payload = CreateInventoryStockInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.inventoryStock")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InventoryStock;
  },
  updateInventoryStock: async (_parent, args, ctx) => {
    const payload = UpdateInventoryStockInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.inventoryStock")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

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
