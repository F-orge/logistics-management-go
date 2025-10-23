import {
  BinThresholds,
  CreateBinThresholdInputSchema,
  UpdateBinThresholdInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createBinThreshold'|'removeBinThreshold'|'updateBinThreshold'> = {
  createBinThreshold: async (_parent, args, ctx) => {
    const payload = CreateBinThresholdInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.binThresholds")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as BinThresholds;
  },
  updateBinThreshold: async (_parent, args, ctx) => {
    const payload = UpdateBinThresholdInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.binThresholds")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as BinThresholds;
  },
  removeBinThreshold: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.binThresholds")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
