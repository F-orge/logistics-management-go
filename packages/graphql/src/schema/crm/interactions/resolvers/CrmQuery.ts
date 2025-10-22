import { Interactions } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "interaction" | "interactions"> =
  {
    interactions: async (_parent, args, ctx) => {
      let query = ctx.db.selectFrom("crm.interactions").selectAll();

      if (args.page && args.perPage) {
        const offset = (args.page - 1) * args.perPage;
        query = query.offset(offset).limit(args.perPage);
      }

      const results = await query.execute();

      return results as unknown as Interactions[];
    },
    interaction: async (_parent, args, ctx) => {
      const result = await ctx.db
        .selectFrom("crm.interactions")
        .selectAll()
        .where("id", "=", args.id)
        .executeTakeFirstOrThrow();

      return result as unknown as Interactions;
    },
  };
