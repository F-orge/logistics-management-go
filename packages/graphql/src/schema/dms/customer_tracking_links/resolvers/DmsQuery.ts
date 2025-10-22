import { CustomerTrackingLinks } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<
  DmsQueryResolvers,
  "customerTrackingLink" | "customerTrackingLinks"
> = {
  customerTrackingLinks: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("dms.customerTrackingLinks").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as CustomerTrackingLinks[];
  },
  customerTrackingLink: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("dms.customerTrackingLinks")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as CustomerTrackingLinks;
  },
};
