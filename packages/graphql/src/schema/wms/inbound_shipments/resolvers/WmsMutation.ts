import {
  CreateInboundShipmentInputSchema,
  InboundShipments,
  UpdateInboundShipmentInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
  WmsMutationResolvers,
  "createInboundShipment" | "removeInboundShipment" | "updateInboundShipment"
> = {
  createInboundShipment: async (_parent, args, ctx) => {
    const payload = CreateInboundShipmentInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.inboundShipments")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InboundShipments;
  },
  updateInboundShipment: async (_parent, args, ctx) => {
    const payload = UpdateInboundShipmentInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.inboundShipments")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

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
