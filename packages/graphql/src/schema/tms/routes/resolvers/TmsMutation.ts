import {
  CreateRouteInputSchema,
  Routes,
  UpdateRouteInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createRoute" | "removeRoute" | "updateRoute"
> = {
  createRoute: async (_parent, args, ctx) => {
    const payload = CreateRouteInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.routes")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Routes;
  },
  updateRoute: async (_parent, args, ctx) => {
    const payload = UpdateRouteInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.routes")
      .set(payload)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Routes;
  },
  removeRoute: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.routes")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
