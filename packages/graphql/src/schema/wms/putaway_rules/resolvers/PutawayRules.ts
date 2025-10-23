import { Companies, Locations, WmsProducts } from "../../../../zod.schema";
import type { PutawayRulesResolvers } from "./../../../types.generated";
export const PutawayRules: PutawayRulesResolvers = {
  product: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.products")
      .selectAll("wms.products")
      .innerJoin(
        "wms.putawayRules",
        "wms.putawayRules.productId",
        "wms.products.id"
      )
      .where("wms.putawayRules.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as WmsProducts;
  },
  client: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.companies")
      .selectAll("crm.companies")
      .innerJoin(
        "wms.putawayRules",
        "wms.putawayRules.clientId",
        "crm.companies.id"
      )
      .where("wms.putawayRules.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Companies;
  },
  preferredLocation: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.locations")
      .selectAll("wms.locations")
      .innerJoin(
        "wms.putawayRules",
        "wms.putawayRules.preferredLocationId",
        "wms.locations.id"
      )
      .where("wms.putawayRules.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Locations;
  },
};
