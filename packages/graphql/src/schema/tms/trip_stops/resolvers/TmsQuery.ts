import { TripStops } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<TmsQueryResolvers, "tripStop" | "tripStops"> = {
  tripStops: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("tms.tripStops").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as TripStops[];
  },
  tripStop: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.tripStops")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as TripStops;
  },
};
