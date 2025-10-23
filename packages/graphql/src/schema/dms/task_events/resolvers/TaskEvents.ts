import { DeliveryTasks } from "../../../../zod.schema";
import type { TaskEventsResolvers } from "./../../../types.generated";
export const TaskEvents: TaskEventsResolvers = {
  deliveryTask: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("dms.deliveryTasks")
      .selectAll("dms.deliveryTasks")
      .innerJoin(
        "dms.taskEvents",
        "dms.taskEvents.deliveryTaskId",
        "dms.deliveryTasks.id"
      )
      .where("dms.taskEvents.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as DeliveryTasks;
  },
};
