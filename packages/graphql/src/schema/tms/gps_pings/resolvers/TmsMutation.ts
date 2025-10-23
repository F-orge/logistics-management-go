import {
  CreateGpsPingInputSchema,
  GpsPings,
  UpdateGpsPingInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createGpsPing'|'removeGpsPing'|'updateGpsPing'> = {
  createGpsPing: async (_parent, args, ctx) => {
    const payload = CreateGpsPingInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.gpsPings")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as GpsPings;
  },
  updateGpsPing: async (_parent, args, ctx) => {
    const payload = UpdateGpsPingInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.gpsPings")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as GpsPings;
  },
  removeGpsPing: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.gpsPings")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
