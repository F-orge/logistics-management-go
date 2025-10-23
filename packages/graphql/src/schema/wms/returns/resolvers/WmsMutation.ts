import {
  CreateReturnInputSchema,
  Returns,
  UpdateReturnInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createReturn" | "removeReturn" | "updateReturn"
> = {
  createReturn: async (_parent, args, ctx) => {
    const payload = CreateReturnInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.returns")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as Returns;
  },
  updateReturn: async (_parent, args, ctx) => {
    const payload = UpdateReturnInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.returns")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Returns;
  },
  removeReturn: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.returns")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
