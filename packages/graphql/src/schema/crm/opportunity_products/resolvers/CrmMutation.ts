import {
  CreateOpportunityInputSchema,
  OpportunityProducts,
  UpdateOpportunityInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<CrmMutationResolvers, 'createOpportunityProduct'|'removeOpportunityProduct'|'updateOpportunityProduct'> = {
  createOpportunityProduct: async (_parent, args, ctx) => {
    const payload = CreateOpportunityInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.opportunityProducts")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as OpportunityProducts;
  },
  updateOpportunityProduct: async (_parent, args, ctx) => {
    const payload = UpdateOpportunityInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.opportunityProducts")
      .set(payload as any)
      .where("opportunityId", "=", args.opportunityId)
      .where("productId", "=", args.productId)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as OpportunityProducts;
  },
  removeOpportunityProduct: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.opportunityProducts")
      .where("opportunityId", "=", args.opportunityId)
      .where("productId", "=", args.productId)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
