import {
  DmsDeliveryFailureReasonEnum,
  DmsDeliveryTaskStatusEnum,
} from "../../../../db.types";
import {
  CreateDeliveryTaskInputSchema,
  DeliveryTasks,
  UpdateDeliveryTaskInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<
  DmsMutationResolvers,
  "createDeliveryTask" | "updateDeliveryTask"
> = {
  createDeliveryTask: async (_parent, args, ctx) => {
    const payload = CreateDeliveryTaskInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.deliveryTasks")
      .values({
        ...payload,
        status: payload.status
          ? DmsDeliveryTaskStatusEnum[payload.status]
          : DmsDeliveryTaskStatusEnum.PENDING,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DeliveryTasks;
  },
  updateDeliveryTask: async (_parent, args, ctx) => {
    const payload = UpdateDeliveryTaskInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousTask = await ctx.db
      .selectFrom("dms.deliveryTasks")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("dms.deliveryTasks")
      .set({
        ...payload,
        status: payload.status
          ? DmsDeliveryTaskStatusEnum[payload.status]
          : undefined,
        failureReason: payload.failureReason
          ? DmsDeliveryFailureReasonEnum[payload.failureReason]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed events
    if (payload.status && payload.status !== previousTask.status) {
      const status = payload.status as DmsDeliveryTaskStatusEnum;

      ctx.pubsub.publish("dms.deliveryTask.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousTask.status as DmsDeliveryTaskStatusEnum,
        deliveryRouteId: result.deliveryRouteId,
      });

      if (status === "OUT_FOR_DELIVERY") {
        ctx.pubsub.publish("dms.deliveryTask.outForDelivery", result);
      } else if (status === "DELIVERED") {
        ctx.pubsub.publish("dms.deliveryTask.delivered", result);
      } else if (status === "FAILED") {
        ctx.pubsub.publish("dms.deliveryTask.failed", result);
      }
    }

    return result as unknown as DeliveryTasks;
  },
};
