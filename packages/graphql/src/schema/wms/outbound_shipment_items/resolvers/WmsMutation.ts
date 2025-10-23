import {
  CreateOutboundShipmentItemInputSchema,
  OutboundShipmentItems,
  UpdateOutboundShipmentItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createOutboundShipmentItem'|'removeOutboundShipmentItem'|'updateOutboundShipmentItem'> = {
  createOutboundShipmentItem: async (_parent, args, ctx) => {
    const payload = CreateOutboundShipmentItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.outboundShipmentItems")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as OutboundShipmentItems;
  },
  updateOutboundShipmentItem: async (_parent, args, ctx) => {
    const payload = UpdateOutboundShipmentItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.outboundShipmentItems")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as OutboundShipmentItems;
  },
  removeOutboundShipmentItem: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.outboundShipmentItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
