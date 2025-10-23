import {
  CreateWarehouseInputSchema,
  UpdateWarehouseInputSchema,
  Warehouses,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createWarehouse" | "removeWarehouse" | "updateWarehouse"
> = {
  createWarehouse: async (_parent, args, ctx) => {
    const payload = CreateWarehouseInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.warehouses")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Warehouses;
  },
  updateWarehouse: async (_parent, args, ctx) => {
    const payload = UpdateWarehouseInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.warehouses")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Warehouses;
  },
  removeWarehouse: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.warehouses")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
