import type {
	Campaigns,
	Companies,
	Contacts,
	Opportunities,
	User,
} from "../../../../zod.schema";
import type { LeadsResolvers } from "./../../../types.generated";
export const Leads: LeadsResolvers = {
	campaign: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.campaigns")
			.selectAll("crm.campaigns")
			.innerJoin("crm.leads", "crm.leads.campaignId", "crm.campaigns.id")
			.where("crm.leads.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Campaigns;
	},
	convertedCompany: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.companies")
			.selectAll("crm.companies")
			.innerJoin(
				"crm.leads",
				"crm.leads.convertedCompanyId",
				"crm.companies.id",
			)
			.where("crm.leads.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Companies;
	},
	convertedContact: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.contacts")
			.selectAll("crm.contacts")
			.innerJoin("crm.leads", "crm.leads.convertedContactId", "crm.contacts.id")
			.where("crm.leads.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Contacts;
	},
	owner: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("user")
			.selectAll("user")
			.innerJoin("crm.leads", "crm.leads.ownerId", "user.id")
			.where("crm.leads.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as User;
	},
	convertedOpportunity: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.opportunities")
			.selectAll("crm.opportunities")
			.innerJoin(
				"crm.leads",
				"crm.leads.convertedOpportunityId",
				"crm.opportunities.id",
			)
			.where("crm.leads.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Opportunities;
	},
};
