import type { Carriers, PartnerInvoiceItems } from "../../../../zod.schema";
import type { PartnerInvoicesResolvers } from "./../../../types.generated";
export const PartnerInvoices: PartnerInvoicesResolvers = {
	carrier: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.carriers")
			.selectAll("tms.carriers")
			.innerJoin(
				"tms.partnerInvoices",
				"tms.partnerInvoices.carrierId",
				"tms.carriers.id",
			)
			.where("tms.partnerInvoices.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Carriers;
	},
	items: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.partnerInvoiceItems")
			.selectAll("tms.partnerInvoiceItems")
			.innerJoin(
				"tms.partnerInvoices",
				"tms.partnerInvoices.id",
				"tms.partnerInvoiceItems.partnerInvoiceId",
			)
			.where("tms.partnerInvoices.id", "=", parent.id as string)
			.execute();

		return result as unknown as PartnerInvoiceItems[];
	},
};
