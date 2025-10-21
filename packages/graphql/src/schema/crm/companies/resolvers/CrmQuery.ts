import { Companies } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "companies" | "company"> = {
  companies: async (_root, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.companies")
      .selectAll()
      .execute();

    return result as Companies[];
  },
};
