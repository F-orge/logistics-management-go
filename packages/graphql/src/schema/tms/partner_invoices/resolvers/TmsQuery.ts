import { TmsPartnerInvoiceStatusEnum } from "../../../../db.types";
import type { PartnerInvoices } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<
	TmsQueryResolvers,
	"partnerInvoice" | "partnerInvoices"
> = {
	partnerInvoices: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("tms.partnerInvoices").selectAll();

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
				eb.or([eb("invoiceNumber", "ilike", `%${args.search}%`)]),
			);
		}

		if (args.status) {
			query = query.where(
				"status",
				"=",
				TmsPartnerInvoiceStatusEnum[args.status],
			);
		}

		const results = await query.execute();

		return results as unknown as PartnerInvoices[];
	},
	partnerInvoice: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.partnerInvoices")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as PartnerInvoices;
	},
};
