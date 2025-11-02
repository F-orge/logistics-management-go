import type { BillingInvoices, User } from "../../../../zod.schema";
import type { PaymentsResolvers } from "./../../../types.generated";
export const Payments: PaymentsResolvers = {
	invoice: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("billing.invoices")
			.selectAll("billing.invoices")
			.innerJoin(
				"billing.payments",
				"billing.payments.invoiceId",
				"billing.invoices.id",
			)
			.where("billing.payments.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as BillingInvoices;
	},
	processedByUser: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("user")
			.selectAll("user")
			.innerJoin(
				"billing.payments",
				"billing.payments.processedByUserId",
				"user.id",
			)
			.where("billing.payments.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as User;
	},
};
