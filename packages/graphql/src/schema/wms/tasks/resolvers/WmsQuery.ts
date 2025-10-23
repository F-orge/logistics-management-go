import { Tasks } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<WmsQueryResolvers, 'task'|'tasks'> = {
  tasks: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("wms.tasks").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    if (args.from && args.to) {
      query = query
        .clearLimit()
        .clearOffset()
        .where("createdAt", ">=", args.from as Date)
        .where("createdAt", "<=", args.to as Date);
    }

    if (args.search) {
      query = query.where((eb) =>
        eb.or([
          eb("taskNumber", "ilike", `%${args.search}%`),
          eb("sourceEntityType", "ilike", `%${args.search}%`),
          eb("instructions", "ilike", `%${args.search}%`),
          eb("notes", "ilike", `%${args.search}%`),
        ])
      );
    }

    const results = await query.execute();

    return results as unknown as Tasks[];
  },
  task: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.tasks")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Tasks;
  },
};
