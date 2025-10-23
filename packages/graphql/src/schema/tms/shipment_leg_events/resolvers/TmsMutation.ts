import {
  CreateShipmentLegEventInputSchema,
  ShipmentLegEvents,
  UpdateShipmentLegEventInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createShipmentLegEvent" | "removeShipmentLegEvent" | "updateShipmentLegEvent"
> = {
  createShipmentLegEvent: async (_parent, args, ctx) => {
    const payload = CreateShipmentLegEventInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.shipmentLegEvents")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ShipmentLegEvents;
  },
  updateShipmentLegEvent: async (_parent, args, ctx) => {
    const payload = UpdateShipmentLegEventInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.shipmentLegEvents")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ShipmentLegEvents;
  },
  removeShipmentLegEvent: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.shipmentLegEvents")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
