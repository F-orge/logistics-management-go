import { DriverLocations } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<
  DmsQueryResolvers,
  "driverLocation" | "driverLocations"
> = {
  driverLocations: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("dms.driverLocations").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as DriverLocations[];
  },
  driverLocation: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("dms.driverLocations")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirst();

    return result as unknown as DriverLocations;
  },
};
