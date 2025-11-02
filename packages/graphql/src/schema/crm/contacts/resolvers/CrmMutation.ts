import { GraphQLError } from "graphql";
import {
	type Contacts,
	CreateContactInputSchema,
	UpdateContactInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
	CrmMutationResolvers,
	"createContact" | "removeContact" | "updateContact"
> = {
	createContact: async (_parent, args, ctx) => {
		const payload = CreateContactInputSchema().parse(args.value);

		// FK validation: check if company exists
		const company = await ctx.db
			.selectFrom("crm.companies")
			.select("id")
			.where("id", "=", payload.companyId)
			.executeTakeFirst();

		if (!company) {
			throw new GraphQLError("Company not found", {
				extensions: {
					code: "VALIDATION_ERROR",
				},
			});
		}

		// FK validation: check if owner/user exists
		const owner = await ctx.db
			.selectFrom("user")
			.select("id")
			.where("id", "=", payload.ownerId)
			.executeTakeFirst();

		if (!owner) {
			throw new GraphQLError("Owner not found", {
				extensions: {
					code: "VALIDATION_ERROR",
				},
			});
		}

		const result = await ctx.db
			.insertInto("crm.contacts")
			.values(payload)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as Contacts;
	},
	updateContact: async (_parent, args, ctx) => {
		const payload = UpdateContactInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("crm.contacts")
			.set(payload)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as Contacts;
	},
	removeContact: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("crm.contacts")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
