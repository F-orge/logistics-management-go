import { WmsInboundShipmentStatusEnum } from "../../../../db.types";
import { InboundShipments } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, 'inboundShipment'|'inboundShipments'> = {
  inboundShipments: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.inboundShipments").selectAll();

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

    if (args.status) {
      query = query.where("status", "=", WmsInboundShipmentStatusEnum[args.status]);
    }

    const results = await query.execute();

    return results as unknown as InboundShipments[];
  },
  inboundShipment: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.inboundShipments")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as InboundShipments;
  },
};
