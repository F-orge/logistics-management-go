import { WmsReturnItemConditionEnum } from "../../../../db.types";
import {
  CreateReturnItemInputSchema,
  ReturnItems,
  UpdateReturnItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'addReturnItem'|'removeReturnItem'|'updateReturnItem'> = {
  addReturnItem: async (_parent, args, ctx) => {
    const payload = CreateReturnItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.returnItems")
      .values({
        ...payload,
        returnId: args.id,
        condition: payload.condition
          ? WmsReturnItemConditionEnum[payload.condition]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ReturnItems;
  },
  updateReturnItem: async (_parent, args, ctx) => {
    const payload = UpdateReturnItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.returnItems")
      .set({
        ...payload,
        condition: payload.condition
          ? WmsReturnItemConditionEnum[payload.condition]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ReturnItems;
  },
  removeReturnItem: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.returnItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
