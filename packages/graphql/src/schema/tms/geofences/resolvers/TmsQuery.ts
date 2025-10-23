import { Geofences } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<TmsQueryResolvers, 'geofence'|'geofences'> = {
  geofences: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("tms.geofences").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as Geofences[];
  },
  geofence: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("tms.geofences")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Geofences;
  },
};
