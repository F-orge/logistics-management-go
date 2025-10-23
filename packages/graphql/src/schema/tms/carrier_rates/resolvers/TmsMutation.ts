import {
  CarrierRates,
  CreateCarrierRateInputSchema,
  UpdateCarrierRateInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createCarrierRate'|'removeCarrierRate'|'updateCarrierRate'> = {
  createCarrierRate: async (_parent, args, ctx) => {
    const payload = CreateCarrierRateInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.carrierRates")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as CarrierRates;
  },
  updateCarrierRate: async (_parent, args, ctx) => {
    const payload = UpdateCarrierRateInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.carrierRates")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as CarrierRates;
  },
  removeCarrierRate: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.carrierRates")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
