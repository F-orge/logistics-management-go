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

    return result as unknown as DeliveryTasks;
  },
};
