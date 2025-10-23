import {
  CreatePickBatchItemInputSchema,
  PickBatchItems,
  UpdatePickBatchItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createPickBatchItem'|'removePickBatchItem'|'updatePickBatchItem'> = {
  createPickBatchItem: async (_parent, args, ctx) => {
    const payload = CreatePickBatchItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.pickBatchItems")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PickBatchItems;
  },
  updatePickBatchItem: async (_parent, args, ctx) => {
    const payload = UpdatePickBatchItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.pickBatchItems")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PickBatchItems;
  },
  removePickBatchItem: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.pickBatchItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
