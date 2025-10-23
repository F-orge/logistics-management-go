import { Packages } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, "package" | "packages"> = {
  packages: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.packages").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as Packages[];
  },
  package: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.packages")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Packages;
  },
};
