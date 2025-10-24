import { DmsDeliveryFailureReasonEnum, DmsDeliveryTaskStatusEnum } from "../../../../db.types";
import { DeliveryTasks } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<DmsQueryResolvers, 'deliveryTask'|'deliveryTasks'> = {
  deliveryTasks: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("dms.deliveryTasks").selectAll();

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
          eb("deliveryAddress", "ilike", `%${args.search}%`),
          eb("recipientName", "ilike", `%${args.search}%`),
          eb("recipientPhone", "ilike", `%${args.search}%`),
          eb("deliveryInstructions", "ilike", `%${args.search}%`),
        ])
      );
    }

    if (args.status) {
      query = query.where("status", "=", DmsDeliveryTaskStatusEnum[args.status]);
    }

    if (args.failureReason) {
      query = query.where(
        "failureReason",
        "=",
        DmsDeliveryFailureReasonEnum[args.failureReason]
      );
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
