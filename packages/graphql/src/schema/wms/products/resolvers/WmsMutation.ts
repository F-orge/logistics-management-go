import { WmsProductStatusEnum } from "../../../../db.types";
import {
  CreateWmsProductInputSchema,
  UpdateWmsProductInputSchema,
  WmsProducts,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createWmsProduct" | "removeWmsProduct" | "updateWmsProduct"
> = {
  createWmsProduct: async (_parent, args, ctx) => {
    const payload = CreateWmsProductInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.products")
      .values({
        ...payload,
        status: payload.status
          ? WmsProductStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as WmsProducts;
  },
  updateWmsProduct: async (_parent, args, ctx) => {
    const payload = UpdateWmsProductInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.products")
      .set({
        ...payload,
        status: payload.status
          ? WmsProductStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as WmsProducts;
  },
  removeWmsProduct: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.products")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
