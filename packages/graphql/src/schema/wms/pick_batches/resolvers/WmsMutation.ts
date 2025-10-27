import { WmsPickBatchStatusEnum } from "../../../../db.types";
import {
  CreatePickBatchInputSchema,
  PickBatches,
  UpdatePickBatchInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createPickBatch" | "removePickBatch" | "updatePickBatch"
> = {
  createPickBatch: async (_parent, args, ctx) => {
    const payload = CreatePickBatchInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.pickBatches")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish created event
    ctx.pubsub.publish("wms.pickBatch.created", result);

    return result as unknown as PickBatches;
  },
  updatePickBatch: async (_parent, args, ctx) => {
    const payload = UpdatePickBatchInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousBatch = await ctx.db
      .selectFrom("wms.pickBatches")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("wms.pickBatches")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousBatch.status) {
      const status = payload.status as WmsPickBatchStatusEnum;

      ctx.pubsub.publish("wms.pickBatch.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousBatch.status as WmsPickBatchStatusEnum,
      });

      // Publish specific status events
      if (status === "IN_PROGRESS") {
        ctx.pubsub.publish("wms.pickBatch.started", result);
      } else if (status === "COMPLETED") {
        ctx.pubsub.publish("wms.pickBatch.completed", result);
      }
    }

    return result as unknown as PickBatches;
  },
  removePickBatch: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.pickBatches")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
