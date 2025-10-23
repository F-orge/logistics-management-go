import { Leads } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "lead" | "leads"> = {
  leads: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("crm.leads").selectAll();

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
        eb.or([
          eb("name", "ilike", `%${args.search}%`),
          eb("email", "ilike", `%${args.search}%`),
          eb("leadSource", "ilike", args.search as any),
          eb("status", "ilike", args.search as any),
        ])
      );
    }
    const results = await query.execute();
    return results as unknown as Leads[];
  },
  lead: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.leads")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Leads;
  },
};
