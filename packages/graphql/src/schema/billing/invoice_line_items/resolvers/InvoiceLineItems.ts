import type { BillingInvoices, Disputes } from "../../../../zod.schema";
import type { InvoiceLineItemsResolvers } from "./../../../types.generated";
export const InvoiceLineItems: InvoiceLineItemsResolvers = {
	invoice: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("billing.invoices")
			.selectAll("billing.invoices")
			.innerJoin(
				"billing.invoiceLineItems",
				"billing.invoiceLineItems.invoiceId",
				"billing.invoices.id",
			)
			.where("billing.invoiceLineItems.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as BillingInvoices;
	},
	disputes: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("billing.disputes")
			.selectAll("billing.disputes")
			.where("billing.disputes.lineItemId", "=", parent.id as string)
			.execute();

		return results as unknown as Disputes[];
	},
};
