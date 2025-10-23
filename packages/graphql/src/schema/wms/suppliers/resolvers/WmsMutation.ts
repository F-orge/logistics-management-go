import {
  CreateSupplierInputSchema,
  Suppliers,
  UpdateSupplierInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createSupplier'|'removeSupplier'|'updateSupplier'> = {
  createSupplier: async (_parent, args, ctx) => {
    const payload = CreateSupplierInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.suppliers")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as Suppliers;
  },
  updateSupplier: async (_parent, args, ctx) => {
    const payload = UpdateSupplierInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.suppliers")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Suppliers;
  },
  removeSupplier: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.suppliers")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
