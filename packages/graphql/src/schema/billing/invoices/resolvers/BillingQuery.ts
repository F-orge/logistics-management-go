import { BillingInvoiceStatusEnum } from "../../../../db.types";
import type { BillingInvoices } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<
	BillingQueryResolvers,
	"billingInvoice" | "billingInvoices"
> = {
	billingInvoices: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("billing.invoices").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.from && args.to) {
			query = query
				.clearLimit()
				.clearOffset()
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		if (args.search) {
			query = query.where((eb) =>
				eb.or([
					eb("invoiceNumber", "ilike", `%${args.search}%`),
					eb("currency", "ilike", `%${args.search}%`),
					eb("paymentTerms", "ilike", `%${args.search}%`),
					eb("notes", "ilike", `%${args.search}%`),
				]),
			);
		}

		if (args.status) {
			query = query.where("status", "=", BillingInvoiceStatusEnum[args.status]);
		}

		const results = await query.execute();

		return results as unknown as BillingInvoices[];
	},
	billingInvoice: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("billing.invoices")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as BillingInvoices;
	},
};
