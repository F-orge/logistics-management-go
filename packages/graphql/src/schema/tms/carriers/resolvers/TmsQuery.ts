import { Carriers } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<TmsQueryResolvers, 'carrier'|'carriers'> = {
  carriers: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("tms.carriers").selectAll();

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

    return results as unknown as Carriers[];
  },
  carrier: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.carriers")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Carriers;
  },
};
