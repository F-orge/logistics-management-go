import type { Companies, User } from "../../../../zod.schema";
import type { ContactsResolvers } from "./../../../types.generated";
export const Contacts: ContactsResolvers = {
	company: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.companies")
			.selectAll("crm.companies")
			.innerJoin("crm.contacts", "crm.contacts.companyId", "crm.companies.id")
			.where("crm.contacts.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Companies;
	},
	owner: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("user")
			.selectAll("user")
			.innerJoin("crm.contacts", "crm.contacts.ownerId", "user.id")
			.where("crm.contacts.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as User;
	},
};
