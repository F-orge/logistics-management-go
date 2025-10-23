import {
  CreateTripInputSchema,
  Trips,
  UpdateTripInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createTrip'|'removeTrip'|'updateTrip'> = {
  createTrip: async (_parent, args, ctx) => {
    const payload = CreateTripInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.trips")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as Trips;
  },
  updateTrip: async (_parent, args, ctx) => {
    const payload = UpdateTripInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.trips")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Trips;
  },
  removeTrip: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.trips")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
