import { Opportunities } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, 'opportunities'|'opportunity'> = {
  opportunities: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("crm.opportunities").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const opportunities = await query.execute();
    return opportunities as unknown as Opportunities[];
  },
  opportunity: async (_parent, args, ctx) => {
    const opportunity = await ctx.db
      .selectFrom("crm.opportunities")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return opportunity as unknown as Opportunities;
  },
};
