import { WmsStockTransferStatusEnum } from "../../../../db.types";
import { StockTransfers } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, 'stockTransfer'|'stockTransfers'> = {
  stockTransfers: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.stockTransfers").selectAll();

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
      query = query.where(
        "status",
        "=",
        WmsStockTransferStatusEnum[args.status]
      );
    }

    const results = await query.execute();

    return results as unknown as StockTransfers[];
  },
  stockTransfer: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.stockTransfers")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as StockTransfers;
  },
};
