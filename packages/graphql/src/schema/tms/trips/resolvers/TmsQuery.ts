import { Trips } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<TmsQueryResolvers, "trip" | "trips"> = {
  trips: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("tms.trips").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as Trips[];
  },
  trip: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.trips")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Trips;
  },
};
