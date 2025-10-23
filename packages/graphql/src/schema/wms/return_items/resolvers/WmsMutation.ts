import {
  CreateReturnItemInputSchema,
  ReturnItems,
  UpdateReturnItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createReturnItem" | "removeReturnItem" | "updateReturnItem"
> = {
  createReturnItem: async (_parent, args, ctx) => {
    const payload = CreateReturnItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.returnItems")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ReturnItems;
  },
  updateReturnItem: async (_parent, args, ctx) => {
    const payload = UpdateReturnItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.returnItems")
      .set(payload as any)
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
