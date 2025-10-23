import { Carriers } from "../../../../zod.schema";
import type { PartnerInvoicesResolvers } from "./../../../types.generated";
export const PartnerInvoices: PartnerInvoicesResolvers = {
  carrier: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.carriers")
      .selectAll("tms.carriers")
      .innerJoin(
        "tms.partnerInvoices",
        "tms.partnerInvoices.carrierId",
        "tms.carriers.id"
      )
      .where("tms.partnerInvoices.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Carriers;
  },
};
