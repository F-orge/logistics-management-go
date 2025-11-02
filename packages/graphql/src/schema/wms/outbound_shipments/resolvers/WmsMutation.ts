import { WmsOutboundShipmentStatusEnum } from "../../../../db.types";
import {
  CreateOutboundShipmentInputSchema,
  OutboundShipments,
  UpdateOutboundShipmentInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";

export const WmsMutation: Pick<WmsMutationResolvers, 'createOutboundShipment'|'removeOutboundShipment'|'updateOutboundShipment'> = {
  createOutboundShipment: async (_parent, args, ctx) => {
    const payload = CreateOutboundShipmentInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.outboundShipments")
      .values({
        ...payload,
        status: payload.status
          ? WmsOutboundShipmentStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish created event
    await ctx.pubsub.publish("ims.outboundShipment.created", result);

    return result as unknown as OutboundShipments;
  },
  updateOutboundShipment: async (_parent, args, ctx) => {
    const payload = UpdateOutboundShipmentInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousShipment = await ctx.db
      .selectFrom("wms.outboundShipments")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("wms.outboundShipments")
      .set({
        ...payload,
        status: payload.status
          ? WmsOutboundShipmentStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousShipment.status) {
      const status = WmsOutboundShipmentStatusEnum[payload.status];

      await ctx.pubsub.publish("ims.outboundShipment.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousShipment.status
          ? WmsOutboundShipmentStatusEnum[previousShipment.status]
          : WmsOutboundShipmentStatusEnum.PACKED,
        salesOrderId: result.salesOrderId,
      });

      // Publish specific status events
      if (status === "PICKING") {
        await ctx.pubsub.publish("ims.outboundShipment.picking", result);
      } else if (status === "PACKED") {
        await ctx.pubsub.publish("ims.outboundShipment.packed", result);
      } else if (status === "SHIPPED") {
        await ctx.pubsub.publish("ims.outboundShipment.shipped", result);
      } else if (status === "DELIVERED") {
        await ctx.pubsub.publish("ims.outboundShipment.delivered", result);
      }
    }

    return result as unknown as OutboundShipments;
  },
  removeOutboundShipment: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.outboundShipments")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
