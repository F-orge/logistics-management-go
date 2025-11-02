import type {
	Companies,
	CreditNotes,
	InvoiceLineItems,
	User,
} from "../../../../zod.schema";
import type { DisputesResolvers } from "./../../../types.generated";

export const Disputes: DisputesResolvers = {
	lineItem: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("billing.invoiceLineItems")
			.selectAll("billing.invoiceLineItems")
			.innerJoin(
				"billing.disputes",
				"billing.disputes.lineItemId",
				"billing.invoiceLineItems.id",
			)
			.where("billing.disputes.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as InvoiceLineItems;
	},
	client: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.companies")
			.selectAll("crm.companies")
			.innerJoin(
				"billing.disputes",
				"billing.disputes.clientId",
				"crm.companies.id",
			)
			.where("billing.disputes.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Companies;
	},
	resolvedByUser: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("user")
			.selectAll("user")
			.innerJoin(
				"billing.disputes",
				"billing.disputes.resolvedByUserId",
				"user.id",
			)
			.where("billing.disputes.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as User;
	},
	creditNotes: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("billing.creditNotes")
			.selectAll("billing.creditNotes")
			.where("billing.creditNotes.disputeId", "=", parent.id as string)
			.execute();

		return results as unknown as CreditNotes[];
	},
};
