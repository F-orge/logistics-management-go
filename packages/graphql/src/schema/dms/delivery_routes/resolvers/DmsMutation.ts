import {
  CreateDeliveryRouteInputSchema,
  DeliveryRoutes,
  UpdateDeliveryRouteInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";
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

    const result = await ctx.db
      .updateTable("dms.deliveryRoutes")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

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
