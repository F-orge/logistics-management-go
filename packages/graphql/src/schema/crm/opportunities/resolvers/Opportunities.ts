import {
  Campaigns,
  Companies,
  Contacts,
  OpportunityProducts,
  Products,
  User,
} from "../../../../zod.schema";
import type { OpportunitiesResolvers } from "./../../../types.generated";
export const Opportunities: OpportunitiesResolvers = {
  campaign: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.campaigns")
      .selectAll("crm.campaigns")
      .innerJoin(
        "crm.opportunities",
        "crm.opportunities.campaignId",
        "crm.campaigns.id"
      )
      .where("crm.opportunities.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Campaigns;
  },
  company: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.companies")
      .selectAll("crm.companies")
      .innerJoin(
        "crm.opportunities",
        "crm.opportunities.companyId",
        "crm.companies.id"
      )
      .where("crm.opportunities.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Companies;
  },
  contact: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.contacts")
      .selectAll("crm.contacts")
      .innerJoin(
        "crm.opportunities",
        "crm.opportunities.contactId",
        "crm.contacts.id"
      )
      .where("crm.opportunities.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Contacts;
  },
  owner: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin("crm.opportunities", "crm.opportunities.ownerId", "user.id")
      .where("crm.opportunities.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
  products: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("crm.opportunityProducts")
      .selectAll("crm.opportunityProducts")
      .innerJoin(
        "crm.products",
        "crm.opportunityProducts.productId",
        "crm.products.id"
      )
      .where("crm.opportunityProducts.opportunityId", "=", parent.id as string)
      .execute();

    return results as unknown as OpportunityProducts[];
  },
};
