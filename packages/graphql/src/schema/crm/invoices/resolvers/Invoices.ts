import { InvoiceItems, Opportunities } from "../../../../zod.schema";
import type { InvoicesResolvers } from "./../../../types.generated";
export const Invoices: InvoicesResolvers = {
  items: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("crm.invoiceItems")
      .selectAll()
      .where("crm.invoiceItems.invoiceId", "=", parent.id as string)
      .execute();

    return results as unknown as InvoiceItems[];
  },
  opportunity: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.opportunities")
      .selectAll("crm.opportunities")
      .innerJoin(
        "crm.invoices",
        "crm.invoices.opportunityId",
        "crm.opportunities.id"
      )
      .where("crm.invoices.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Opportunities;
  },
};
