import {
  CreateGeofenceEventInputSchema,
  GeofenceEvents,
  UpdateGeofenceEventInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createGeofenceEvent'|'removeGeofenceEvent'|'updateGeofenceEvent'> = {
  createGeofenceEvent: async (_parent, args, ctx) => {
    const payload = CreateGeofenceEventInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.geofenceEvents")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as GeofenceEvents;
  },
  updateGeofenceEvent: async (_parent, args, ctx) => {
    const payload = UpdateGeofenceEventInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.geofenceEvents")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as GeofenceEvents;
  },
  removeGeofenceEvent: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.geofenceEvents")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
