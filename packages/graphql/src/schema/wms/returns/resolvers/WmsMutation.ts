import { WmsReturnStatusEnum } from "../../../../db.types";
import {
  CreateReturnInputSchema,
  Returns,
  UpdateReturnInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createReturn" | "removeReturn" | "updateReturn"
> = {
  createReturn: async (_parent, args, ctx) => {
    const payload = CreateReturnInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.returns")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Returns;
  },
  updateReturn: async (_parent, args, ctx) => {
    const payload = UpdateReturnInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousReturn = await ctx.db
      .selectFrom("wms.returns")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("wms.returns")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousReturn.status) {
      const status = payload.status as WmsReturnStatusEnum;

      ctx.pubsub.publish("wms.return.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousReturn.status as WmsReturnStatusEnum,
        clientId: result.clientId,
      });

      // Publish specific status events
      if (status === "RECEIVED") {
        ctx.pubsub.publish("wms.return.received", result);
      } else if (status === "APPROVED") {
        ctx.pubsub.publish("wms.return.approved", result);
      } else if (status === "REJECTED") {
        ctx.pubsub.publish("wms.return.rejected", {
          ...result,
          rejectionReason: null,
        });
      } else if (status === "PROCESSED") {
        ctx.pubsub.publish("wms.return.processed", result);
      }
    }

    return result as unknown as Returns;
  },
  removeReturn: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.returns")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
