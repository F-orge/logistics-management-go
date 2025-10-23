import {
  CreatePackageItemInputSchema,
  PackageItems,
  UpdatePackageItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createPackageItem'|'removePackageItem'|'updatePackageItem'> = {
  createPackageItem: async (_parent, args, ctx) => {
    const payload = CreatePackageItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.packageItems")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as PackageItems;
  },
  updatePackageItem: async (_parent, args, ctx) => {
    const payload = UpdatePackageItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.packageItems")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PackageItems;
  },
  removePackageItem: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.packageItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
