import {
  Campaigns,
  CreateCampaignInputSchema,
  UpdateCampaignInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<CrmMutationResolvers, 'createCampaign'|'removeCampaign'|'updateCampaign'> = {
  createCampaign: async (_parent, args, ctx) => {
    const payload = CreateCampaignInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.campaigns")
      .values(payload)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as Campaigns;
  },
  updateCampaign: async (_parent, args, ctx) => {
    const payload = UpdateCampaignInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.campaigns")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Campaigns;
  },
  removeCampaign: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.campaigns")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
