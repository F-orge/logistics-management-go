import { WmsSalesOrderStatusEnum } from "../../../../db.types";
import {
  CreateSalesOrderInputSchema,
  SalesOrders,
  UpdateSalesOrderInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createSalesOrder" | "removeSalesOrder" | "updateSalesOrder"
> = {
  createSalesOrder: async (_parent, args, ctx) => {
    const payload = CreateSalesOrderInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.salesOrders")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish created event
    ctx.pubsub.publish("wms.salesOrder.created", result);

    return result as unknown as SalesOrders;
  },
  updateSalesOrder: async (_parent, args, ctx) => {
    const payload = UpdateSalesOrderInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousOrder = await ctx.db
      .selectFrom("wms.salesOrders")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("wms.salesOrders")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousOrder.status) {
      const status = payload.status as WmsSalesOrderStatusEnum;

      ctx.pubsub.publish("wms.salesOrder.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousOrder.status as WmsSalesOrderStatusEnum,
        clientId: result.clientId,
      });

      // Publish specific status events
      if (status === "PROCESSING") {
        ctx.pubsub.publish("wms.salesOrder.processing", result);
      } else if (status === "SHIPPED") {
        ctx.pubsub.publish("wms.salesOrder.shipped", result);
      } else if (status === "COMPLETED") {
        ctx.pubsub.publish("wms.salesOrder.completed", result);
      }
    }

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
