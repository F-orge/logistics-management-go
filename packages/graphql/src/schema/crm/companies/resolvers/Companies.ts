import {
  BillingInvoices,
  ClientAccounts,
  Disputes,
  InboundShipments,
  PutawayRules,
  Quotes,
  Returns,
  SalesOrders,
} from "../../../../zod.schema";
import type { CompaniesResolvers } from "./../../../types.generated";

export const Companies: CompaniesResolvers = {
  owner: async (parent, _, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .innerJoin("crm.companies", "crm.companies.ownerId", "user.id")
      .selectAll("user")
      .where("crm.companies.id", "=", parent.id as string)
      .executeTakeFirstOrThrow();

    return result;
  },
  billingInvoices: async (parent, _, ctx) => {
    const results = await ctx.db
      .selectFrom("billing.invoices")
      .selectAll("billing.invoices")
      .where("billing.invoices.clientId", "=", parent.id as string)
      .execute();

    return results as unknown as BillingInvoices[];
  },
  inboundShipments: async (parent, _, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.inboundShipments")
      .selectAll("wms.inboundShipments")
      .where("wms.inboundShipments.clientId", "=", parent.id as string)
      .execute();

    return results as unknown as InboundShipments[];
  },
  clientAccount: async (parent, _, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.clientAccounts")
      .selectAll("billing.clientAccounts")
      .where("billing.clientAccounts.clientId", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as ClientAccounts;
  },
  salesOrders: async (parent, _, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.salesOrders")
      .selectAll("wms.salesOrders")
      .where("wms.salesOrders.clientId", "=", parent.id as string)
      .execute();

    return results as unknown as SalesOrders[];
  },
  returns: async (parent, _, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.returns")
      .selectAll("wms.returns")
      .where("wms.returns.clientId", "=", parent.id as string)
      .execute();

    return results as unknown as Returns[];
  },
  putawayRules: async (parent, _, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.putawayRules")
      .selectAll("wms.putawayRules")
      .where("wms.putawayRules.clientId", "=", parent.id as string)
      .execute();

    return results as unknown as PutawayRules[];
  },
  quotes: async (parent, _, ctx) => {
    const results = await ctx.db
      .selectFrom("billing.quotes")
      .selectAll("billing.quotes")
      .where("billing.quotes.clientId", "=", parent.id as string)
      .execute();

    return results as unknown as Quotes[];
  },
  disputes: async (parent, _, ctx) => {
    const results = await ctx.db
      .selectFrom("billing.disputes")
      .selectAll("billing.disputes")
      .where("billing.disputes.clientId", "=", parent.id as string)
      .execute();

    return results as unknown as Disputes[];
  },
};
