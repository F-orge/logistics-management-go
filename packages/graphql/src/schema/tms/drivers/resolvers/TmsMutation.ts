import {
  CreateDriverInputSchema,
  Drivers,
  UpdateDriverInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createDriver" | "removeDriver" | "updateDriver"
> = {
  createDriver: async (_parent, args, ctx) => {
    const payload = CreateDriverInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.drivers")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as Drivers;
  },
  updateDriver: async (_parent, args, ctx) => {
    const payload = UpdateDriverInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.drivers")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Drivers;
  },
  removeDriver: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.drivers")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
