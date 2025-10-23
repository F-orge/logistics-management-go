import {
  CreateSalesOrderItemInputSchema,
  SalesOrderItems,
  UpdateSalesOrderItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createSalesOrderItem" | "removeSalesOrderItem" | "updateSalesOrderItem"
> = {
  createSalesOrderItem: async (_parent, args, ctx) => {
    const payload = CreateSalesOrderItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.salesOrderItems")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as SalesOrderItems;
  },

  updateSalesOrderItem: async (_parent, args, ctx) => {
    const payload = UpdateSalesOrderItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.salesOrderItems")
      .set(payload as any)
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
