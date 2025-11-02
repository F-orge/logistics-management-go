import { BillingInvoices, Companies, User } from "../../../../zod.schema";
import type { QuotesResolvers } from "./../../../types.generated";
export const Quotes: QuotesResolvers = {
  client: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.companies")
      .selectAll("crm.companies")
      .innerJoin(
        "billing.quotes",
        "billing.quotes.clientId",
        "crm.companies.id"
      )
      .where("billing.quotes.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Companies;
  },
  createdByUser: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin("billing.quotes", "billing.quotes.createdByUserId", "user.id")
      .where("billing.quotes.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
  billingInvoices: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("billing.invoices")
      .selectAll("billing.invoices")
      .where("billing.invoices.quoteId", "=", parent.id as string)
      .execute();

    return results as unknown as BillingInvoices[];
  },
};
