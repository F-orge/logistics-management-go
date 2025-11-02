import { ReorderPoints } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, 'reorderPoint'|'reorderPoints'> = {
  reorderPoints: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.reorderPoints").selectAll();

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

    const results = await query.execute();

    return results as unknown as ReorderPoints[];
  },
  reorderPoint: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.reorderPoints")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as ReorderPoints;
  },
};
