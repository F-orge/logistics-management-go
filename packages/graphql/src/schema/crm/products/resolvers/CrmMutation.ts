import {
  CreateProductInputSchema,
  Products,
  UpdateProductInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<CrmMutationResolvers, 'createProduct'|'removeProduct'|'updateProduct'> = {
  createProduct: async (_parent, args, ctx) => {
    const payload = CreateProductInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.products")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as Products;
  },
  updateProduct: async (_parent, args, ctx) => {
    const payload = UpdateProductInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.products")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Products;
  },
  removeProduct: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.products")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
