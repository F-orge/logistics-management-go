import { DeliveryTasks } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<
  DmsQueryResolvers,
  "deliveryTask" | "deliveryTasks"
> = {
  deliveryTasks: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("dms.deliveryTasks").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const results = await query.execute();

    return results as unknown as DeliveryTasks[];
  },
  deliveryTask: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("dms.deliveryTasks")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirst();

    return result as unknown as DeliveryTasks;
  },
};
