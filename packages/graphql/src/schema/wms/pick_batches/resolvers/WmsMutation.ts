import {
  CreatePickBatchInputSchema,
  PickBatches,
  UpdatePickBatchInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createPickBatch" | "removePickBatch" | "updatePickBatch"
> = {
  createPickBatch: async (_parent, args, ctx) => {
    const payload = CreatePickBatchInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.pickBatches")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as PickBatches;
  },
  updatePickBatch: async (_parent, args, ctx) => {
    const payload = UpdatePickBatchInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.pickBatches")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PickBatches;
  },
  removePickBatch: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.pickBatches")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
