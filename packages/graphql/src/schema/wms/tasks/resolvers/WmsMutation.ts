import { WmsTaskStatusEnum, WmsTaskTypeEnum } from "../../../../db.types";
import {
  CreateTaskInputSchema,
  Tasks,
  UpdateTaskInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createTask" | "removeTask" | "updateTask"
> = {
  createTask: async (_parent, args, ctx) => {
    const payload = CreateTaskInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.tasks")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish created event
    ctx.pubsub.publish("wms.task.created", result);

    return result as unknown as Tasks;
  },
  updateTask: async (_parent, args, ctx) => {
    const payload = UpdateTaskInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousTask = await ctx.db
      .selectFrom("wms.tasks")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("wms.tasks")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish assigned event if userId changed
    if (
      payload.userId !== undefined &&
      payload.userId !== previousTask.userId
    ) {
      ctx.pubsub.publish("wms.task.assigned", {
        ...result,
        previousUserId: previousTask.userId,
      });
    }

    // Publish status changed event
    if (payload.status && payload.status !== previousTask.status) {
      const status = payload.status as WmsTaskStatusEnum;

      ctx.pubsub.publish("wms.task.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousTask.status as WmsTaskStatusEnum,
        type: result.type as WmsTaskTypeEnum,
      });

      // Publish specific status events
      if (status === "IN_PROGRESS") {
        ctx.pubsub.publish("wms.task.started", result);
      } else if (status === "COMPLETED") {
        ctx.pubsub.publish("wms.task.completed", result);
      } else if (status === "CANCELLED") {
        ctx.pubsub.publish("wms.task.cancelled", result);
      }
    }

    return result as unknown as Tasks;
  },
  removeTask: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.tasks")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
