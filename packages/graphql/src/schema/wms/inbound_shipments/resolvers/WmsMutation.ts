import { WmsInboundShipmentStatusEnum } from "../../../../db.types";
import {
  CreateInboundShipmentInputSchema,
  InboundShipments,
  UpdateInboundShipmentInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<WmsMutationResolvers, 'createInboundShipment'|'removeInboundShipment'|'updateInboundShipment'> = {
  createInboundShipment: async (_parent, args, ctx) => {
    const payload = CreateInboundShipmentInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.inboundShipments")
      .values({
        ...payload,
        status: payload.status
          ? WmsInboundShipmentStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InboundShipments;
  },
  updateInboundShipment: async (_parent, args, ctx) => {
    const payload = UpdateInboundShipmentInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousShipment = await ctx.db
      .selectFrom("wms.inboundShipments")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("wms.inboundShipments")
      .set({
        ...payload,
        status: payload.status
          ? WmsInboundShipmentStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousShipment.status) {
      const status = payload.status as WmsInboundShipmentStatusEnum;

      await ctx.pubsub.publish("ims.inboundShipment.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousShipment.status as WmsInboundShipmentStatusEnum,
        warehouseId: result.warehouseId,
      });

      // Publish specific status events
      if (status === "ARRIVED") {
        await ctx.pubsub.publish("ims.inboundShipment.received", result);
      } else if (status === "PROCESSING") {
        await ctx.pubsub.publish("ims.inboundShipment.processing", result);
      } else if (status === "COMPLETED") {
        await ctx.pubsub.publish("ims.inboundShipment.completed", result);
      }
    }

    return result as unknown as InboundShipments;
  },
  removeInboundShipment: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.inboundShipments")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
