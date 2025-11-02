import type { InvoiceItems } from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
	CrmMutationResolvers,
	"addInvoiceItem" | "removeInvoiceItem" | "updateInvoiceItem"
> = {
	addInvoiceItem: async (_, args, ctx) => {
		const trx = await ctx.db.startTransaction().execute();

		const invoice = await trx
			.selectFrom("crm.invoices")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		const product = await trx
			.selectFrom("crm.products")
			.select("price")
			.where("id", "=", args.value.productId)
			.executeTakeFirstOrThrow();

		const newItem = await trx
			.insertInto("crm.invoiceItems")
			.values({
				invoiceId: invoice.id,
				price: Number(product.price) * args.value.quantity,
				productId: args.value.productId,
				quantity: args.value.quantity,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		// update the invoice total price

		await trx
			.updateTable("crm.invoices")
			.set("total", (eb) => eb("total", "+", newItem.price))
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		await trx.commit().execute();

		return newItem as unknown as InvoiceItems;
	},
	updateInvoiceItem: async (_, args, ctx) => {
		const trx = await ctx.db.startTransaction().execute();

		const invoiceItem = await trx
			.selectFrom("crm.invoiceItems")
			.select(["price", "invoiceId"])
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		const newInvoiceItem = await trx
			.updateTable("crm.invoiceItems")
			.set("price", Number(invoiceItem.price) * args.value.quantity)
			.returningAll()
			.executeTakeFirstOrThrow();

		// update the main invoice
		await trx
			.updateTable("crm.invoices")
			.set("total", (eb) => eb("total", "+", newInvoiceItem.price))
			.returningAll()
			.executeTakeFirstOrThrow();

		await trx.commit().execute();

		return newInvoiceItem as unknown as InvoiceItems;
	},
	removeInvoiceItem: async (_, args, ctx) => {
		const trx = await ctx.db.startTransaction().execute();

		const invoiceItem = await trx
			.selectFrom("crm.invoiceItems")
			.select(["price", "invoiceId"])
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		// remove the item
		const result = await trx
			.deleteFrom("crm.invoiceItems")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		// update the main invoice

		await trx
			.updateTable("crm.invoices")
			.set("total", (eb) => eb("total", "-", invoiceItem.price))
			.where("id", "=", invoiceItem.invoiceId)
			.executeTakeFirstOrThrow();

		await trx.commit().execute();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
