import { InvoiceItems } from "../../../../zod.schema";
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
};
