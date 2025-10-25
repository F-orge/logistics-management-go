import { Opportunities, Products } from "../../../../zod.schema";
import type { OpportunityProductsResolvers } from "./../../../types.generated";
export const OpportunityProducts: OpportunityProductsResolvers = {
  opportunity: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.opportunities")
      .selectAll("crm.opportunities")
      .innerJoin(
        "crm.opportunityProducts",
        "crm.opportunityProducts.opportunityId",
        "crm.opportunities.id"
      )
      .where("crm.opportunityProducts.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Opportunities;
  },
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.products")
      .selectAll("crm.products")
      .innerJoin(
        "crm.opportunityProducts",
        "crm.opportunityProducts.productId",
        "crm.products.id"
      )
      .where("crm.opportunityProducts.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Products;
  },
};
