import { DmsDeliveryRouteStatusEnum } from "../../../../db.types";
import { DeliveryRoutes } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<DmsQueryResolvers, 'deliveryRoute'|'deliveryRoutes'> = {
  deliveryRoutes: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("dms.deliveryRoutes").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    if (args.from && args.to) {
      query = query
        .clearLimit()
        .clearOffset()
        .where("createdAt", ">=", args.from as Date)
        .where("createdAt", "<=", args.to as Date);
    }

    if (args.search) {
      query = query.where((eb) =>
        eb.or([eb("optimizedRouteData", "ilike", `%${args.search}%`)])
      );
    }

    if (args.status) {
      query = query.where("status", "=", DmsDeliveryRouteStatusEnum[args.status]);
    }

    const results = await query.execute();

    return results as unknown as DeliveryRoutes[];
  },
  deliveryRoute: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("dms.deliveryRoutes")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirst();

    return result as unknown as DeliveryRoutes;
  },
};
