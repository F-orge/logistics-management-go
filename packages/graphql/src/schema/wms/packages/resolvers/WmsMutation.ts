import {
  CreatePackageInputSchema,
  Packages,
  UpdatePackageInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createPackage'|'removePackage'|'updatePackage'> = {
  createPackage: async (_parent, args, ctx) => {
    const payload = CreatePackageInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.packages")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Packages;
  },
  updatePackage: async (_parent, args, ctx) => {
    const payload = UpdatePackageInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.packages")
      .set(payload)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Packages;
  },
  removePackage: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.packages")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
