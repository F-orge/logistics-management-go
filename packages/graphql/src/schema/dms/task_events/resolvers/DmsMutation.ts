import { DmsTaskEventStatusEnum } from "../../../../db.types";
import { CreateTaskEventInputSchema, TaskEvents } from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<DmsMutationResolvers, 'createTaskEvent'> = {
  createTaskEvent: async (_parent, args, ctx) => {
    const payload = CreateTaskEventInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.taskEvents")
      .values({
        ...payload,
        status: payload.status
          ? DmsTaskEventStatusEnum[payload.status]
          : DmsTaskEventStatusEnum.STARTED,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish task event recorded
    await ctx.pubsub.publish("dms.taskEvent.recorded", result);

    // Publish status updated if applicable
    if (payload.status) {
      await ctx.pubsub.publish("dms.taskEvent.statusUpdated", {
        taskEventId: result.id,
        deliveryTaskId: result.deliveryTaskId,
        newStatus: payload.status as DmsTaskEventStatusEnum,
      });
    }

    return result as unknown as TaskEvents;
  },
};
