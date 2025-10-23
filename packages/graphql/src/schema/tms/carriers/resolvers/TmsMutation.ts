import { Carriers, CreateCarrierInputSchema } from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createCarrier" | "removeCarrier" | "updateCarrier"
> = {
  createCarrier: async (_parent, args, ctx) => {
    const payload = CreateCarrierInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.carriers")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Carriers;
  },
  updateCarrier: async (_parent, args, ctx) => {
    const payload = CreateCarrierInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.carriers")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Carriers;
  },
  removeCarrier: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.carriers")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
