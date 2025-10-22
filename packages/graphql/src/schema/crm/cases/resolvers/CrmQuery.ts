import { Cases } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, 'case'|'cases'> = {
  cases: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("crm.cases").selectAll();

    if (args.page && args.perPage) {
      query = query.offset((args.page - 1) * args.perPage).limit(args.perPage);
    }

    const result = await query.execute();
    return result as unknown as Cases[];
  },
  case: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.cases")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Cases;
  },
};
