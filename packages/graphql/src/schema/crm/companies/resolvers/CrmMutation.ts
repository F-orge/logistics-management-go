import { GraphQLError } from "graphql";
import {
	type Companies,
	CreateCompanyInputSchema,
	UpdateCompanyInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
	CrmMutationResolvers,
	"createCompany" | "removeCompany" | "updateCompany"
> = {
	createCompany: async (_, args, ctx) => {
		const payload = CreateCompanyInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("crm.companies")
			.values(payload)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as Companies;
	},
	updateCompany: async (_, args, ctx) => {
		const payload = UpdateCompanyInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("crm.companies")
			.set(payload)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as Companies;
	},
	removeCompany: async (_, args, ctx) => {
		// Check for active contacts
		const activeContacts = await ctx.db
			.selectFrom("crm.contacts")
			.select("id")
			.where("companyId", "=", args.id)
			.executeTakeFirst();

		if (activeContacts) {
			throw new GraphQLError("Cannot delete company with active contacts", {
				extensions: {
					code: "BUSINESS_LOGIC_ERROR",
				},
			});
		}

		// Check for active opportunities
		const activeOpportunities = await ctx.db
			.selectFrom("crm.opportunities")
			.select("id")
			.where("companyId", "=", args.id)
			.executeTakeFirst();

		if (activeOpportunities) {
			throw new GraphQLError(
				"Cannot delete company with active opportunities",
				{
					extensions: {
						code: "BUSINESS_LOGIC_ERROR",
					},
				},
			);
		}

		const result = await ctx.db
			.deleteFrom("crm.companies")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
