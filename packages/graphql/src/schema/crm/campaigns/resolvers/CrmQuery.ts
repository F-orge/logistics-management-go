import { Campaigns } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, 'campaign'|'campaigns'> = {
  campaigns: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("crm.campaigns").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const campaigns = await query.execute();
    return campaigns as Campaigns[];
  },

  campaign: async (_parent, args, ctx) => {
    const campaign = await ctx.db
      .selectFrom("crm.campaigns")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return campaign as Campaigns;
  },
};
