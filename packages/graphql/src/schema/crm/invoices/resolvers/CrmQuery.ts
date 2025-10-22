import { Invoices } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "invoice" | "invoices"> = {
  invoices: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("crm.invoices").selectAll();

    if (args.page && args.perPage) {
      query = query.limit(args.perPage).offset((args.page - 1) * args.perPage);
    }

    const results = await query.execute();

    return results as unknown as Invoices[];
  },
  invoice: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.invoices")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Invoices;
  },
};
