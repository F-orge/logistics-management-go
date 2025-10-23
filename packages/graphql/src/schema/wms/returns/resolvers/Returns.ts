import { Companies, ReturnItems, SalesOrders } from "../../../../zod.schema";
import type { ReturnsResolvers } from "./../../../types.generated";
export const Returns: ReturnsResolvers = {
  salesOrder: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.salesOrders")
      .selectAll("wms.salesOrders")
      .innerJoin(
        "wms.returns",
        "wms.returns.salesOrderId",
        "wms.salesOrders.id"
      )
      .where("wms.returns.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as SalesOrders;
  },
  client: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.companies")
      .selectAll("crm.companies")
      .innerJoin("wms.returns", "wms.returns.clientId", "crm.companies.id")
      .where("wms.returns.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Companies;
  },
  items: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.returnItems")
      .selectAll("wms.returnItems")
      .where("wms.returnItems.returnId", "=", parent.id as string)
      .execute();

    return results as unknown as ReturnItems[];
  },
};
