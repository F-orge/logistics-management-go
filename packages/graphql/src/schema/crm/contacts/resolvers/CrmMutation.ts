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
