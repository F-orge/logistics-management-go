import {
  CreatePackageItemInputSchema,
  PackageItems,
  UpdatePackageItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'addPackageItem'|'removePackageItem'|'updatePackageItem'> = {
  addPackageItem: async (_parent, args, ctx) => {
    const payload = CreatePackageItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.packageItems")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PackageItems;
  },
  updatePackageItem: async (_parent, args, ctx) => {
    const payload = UpdatePackageItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.packageItems")
      .set(payload)
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
