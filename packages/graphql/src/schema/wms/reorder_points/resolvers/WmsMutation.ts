import {
  CreateReorderPointInputSchema,
  ReorderPoints,
  UpdateReorderPointInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createReorderPoint" | "removeReorderPoint" | "updateReorderPoint"
> = {
  createReorderPoint: async (_parent, args, ctx) => {
    const payload = CreateReorderPointInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.reorderPoints")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as ReorderPoints;
  },
  updateReorderPoint: async (_parent, args, ctx) => {
    const payload = UpdateReorderPointInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.reorderPoints")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ReorderPoints;
  },
  removeReorderPoint: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.reorderPoints")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
