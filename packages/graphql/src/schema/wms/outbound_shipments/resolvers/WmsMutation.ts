import {
  CreateOutboundShipmentInputSchema,
  OutboundShipments,
  UpdateOutboundShipmentInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createOutboundShipment" | "removeOutboundShipment" | "updateOutboundShipment"
> = {
  createOutboundShipment: async (_parent, args, ctx) => {
    const payload = CreateOutboundShipmentInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.outboundShipments")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as OutboundShipments;
  },
  updateOutboundShipment: async (_parent, args, ctx) => {
    const payload = UpdateOutboundShipmentInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.outboundShipments")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

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
