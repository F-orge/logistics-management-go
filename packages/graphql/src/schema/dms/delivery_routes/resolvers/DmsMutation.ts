import {
  CreateDeliveryRouteInputSchema,
  DeliveryRoutes,
  UpdateDeliveryRouteInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";
import { DmsDeliveryRouteStatusEnum } from "../../../../db.types";

export const DmsMutation: Pick<DmsMutationResolvers, 'createDeliveryRoute'|'removeDeliveryRoute'|'updateDeliveryRoute'> = {
  createDeliveryRoute: async (_parent, args, ctx) => {
    const payload = CreateDeliveryRouteInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.deliveryRoutes")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DeliveryRoutes;
  },
  updateDeliveryRoute: async (_parent, args, ctx) => {
    const payload = UpdateDeliveryRouteInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousRoute = await ctx.db
      .selectFrom("dms.deliveryRoutes")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("dms.deliveryRoutes")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed events
    if (payload.status && payload.status !== previousRoute.status) {
      const status = payload.status as DmsDeliveryRouteStatusEnum;

      if (status === "IN_PROGRESS") {
        await ctx.pubsub.publish("dms.deliveryRoute.started", result);
      } else if (status === "COMPLETED") {
        await ctx.pubsub.publish("dms.deliveryRoute.completed", result);
      } else if (status === "PAUSED") {
        await ctx.pubsub.publish("dms.deliveryRoute.paused", result);
      } else if (status === "CANCELLED") {
        await ctx.pubsub.publish("dms.deliveryRoute.cancelled", result);
      }
    }

    return result as unknown as DeliveryRoutes;
  },
  removeDeliveryRoute: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("dms.deliveryRoutes")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
