import type {
	Companies,
	CreditNotes,
	InvoiceLineItems,
	Payments,
	Quotes,
	User,
} from "../../../../zod.schema";
import type { BillingInvoicesResolvers } from "./../../../types.generated";
export const BillingInvoices: BillingInvoicesResolvers = {
	quote: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("billing.quotes")
			.selectAll("billing.quotes")
			.innerJoin(
				"billing.invoices",
				"billing.invoices.quoteId",
				"billing.quotes.id",
			)
			.where("billing.invoices.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Quotes;
	},
	client: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.companies")
			.selectAll("crm.companies")
			.innerJoin(
				"billing.invoices",
				"billing.invoices.clientId",
				"crm.companies.id",
			)
			.where("billing.invoices.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Companies;
	},
	createdByUser: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("user")
			.selectAll("user")
			.innerJoin(
				"billing.invoices",
				"billing.invoices.createdByUserId",
				"user.id",
			)
			.where("billing.invoices.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as User;
	},
	lineItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("billing.invoiceLineItems")
			.selectAll("billing.invoiceLineItems")
			.where("billing.invoiceLineItems.invoiceId", "=", parent.id as string)
			.execute();

		return results as unknown as InvoiceLineItems[];
	},
	payments: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("billing.payments")
			.selectAll("billing.payments")
			.where("billing.payments.invoiceId", "=", parent.id as string)
			.execute();

		return results as unknown as Payments[];
	},
	creditNotes: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("billing.creditNotes")
			.selectAll("billing.creditNotes")
			.where("billing.creditNotes.invoiceId", "=", parent.id as string)
			.execute();

		return results as unknown as CreditNotes[];
	},
};
