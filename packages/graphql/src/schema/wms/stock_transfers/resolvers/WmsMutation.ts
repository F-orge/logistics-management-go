import {
  CreateStockTransferInputSchema,
  StockTransfers,
  UpdateStockTransferInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createStockTransfer" | "removeStockTransfer" | "updateStockTransfer"
> = {
  createStockTransfer: async (_parent, args, ctx) => {
    const payload = CreateStockTransferInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.stockTransfers")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as StockTransfers;
  },
  updateStockTransfer: async (_parent, args, ctx) => {
    const payload = UpdateStockTransferInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.stockTransfers")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

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
