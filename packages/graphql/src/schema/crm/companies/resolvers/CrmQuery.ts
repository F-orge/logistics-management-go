import { Companies } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, 'companies'|'company'> = {
  companies: async (_root, args, ctx) => {
    let query = ctx.db.selectFrom("crm.companies").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    return query.execute() as unknown as Companies[];
  },

  company: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.companies")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirst();

    return result as Companies;
  },
};
