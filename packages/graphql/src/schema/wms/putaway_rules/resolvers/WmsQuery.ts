import { PutawayRules } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, 'putawayRule'|'putawayRules'> =
  {
    putawayRules: async (_parent, args, ctx) => {
      let query = ctx.db.selectFrom("wms.putawayRules").selectAll();

      if (args.page && args.perPage) {
        const offset = (args.page - 1) * args.perPage;
        query = query.offset(offset).limit(args.perPage);
      }

      const results = await query.execute();

      return results as unknown as PutawayRules[];
    },
    putawayRule: async (_parent, args, ctx) => {
      const result = await ctx.db
        .selectFrom("wms.putawayRules")
        .selectAll()
        .where("id", "=", args.id)
        .executeTakeFirstOrThrow();

      return result as unknown as PutawayRules;
    },
  };
