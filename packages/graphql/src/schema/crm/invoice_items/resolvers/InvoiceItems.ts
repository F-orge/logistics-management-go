import type { Invoices, Products } from "../../../../zod.schema";
import type { InvoiceItemsResolvers } from "./../../../types.generated";
export const InvoiceItems: InvoiceItemsResolvers = {
	invoice: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.invoices")
			.selectAll("crm.invoices")
			.innerJoin(
				"crm.invoiceItems",
				"crm.invoiceItems.invoiceId",
				"crm.invoices.id",
			)
			.where("crm.invoiceItems.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Invoices;
	},
	product: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.products")
			.selectAll("crm.products")
			.innerJoin(
				"crm.invoiceItems",
				"crm.invoiceItems.productId",
				"crm.products.id",
			)
			.where("crm.invoiceItems.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Products;
	},
};
