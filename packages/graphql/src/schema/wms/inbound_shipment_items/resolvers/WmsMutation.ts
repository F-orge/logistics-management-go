import {
  CreateInboundShipmentItemInputSchema,
  InboundShipmentItems,
  UpdateInboundShipmentItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createInboundShipmentItem'|'removeInboundShipmentItem'|'updateInboundShipmentItem'> = {
  createInboundShipmentItem: async (_parent, args, ctx) => {
    const payload = CreateInboundShipmentItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.inboundShipmentItems")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InboundShipmentItems;
  },
  updateInboundShipmentItem: async (_parent, args, ctx) => {
    const payload = UpdateInboundShipmentItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.inboundShipmentItems")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InboundShipmentItems;
  },
  removeInboundShipmentItem: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.inboundShipmentItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
