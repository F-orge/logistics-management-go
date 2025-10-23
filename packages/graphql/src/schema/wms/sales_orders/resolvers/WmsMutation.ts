import {
  CreateSalesOrderInputSchema,
  SalesOrders,
  UpdateSalesOrderInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createSalesOrder'|'removeSalesOrder'|'updateSalesOrder'> = {
  createSalesOrder: async (_parent, args, ctx) => {
    const payload = CreateSalesOrderInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.salesOrders")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as SalesOrders;
  },
  updateSalesOrder: async (_parent, args, ctx) => {
    const payload = UpdateSalesOrderInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.salesOrders")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as SalesOrders;
  },
  removeSalesOrder: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.salesOrders")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
