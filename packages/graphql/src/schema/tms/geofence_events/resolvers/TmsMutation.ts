import { TmsGeofenceEventTypeEnum } from "../../../../db.types";
import {
  CreateGeofenceEventInputSchema,
  GeofenceEvents,
  UpdateGeofenceEventInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";

export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createGeofenceEvent" | "updateGeofenceEvent"
> = {
  createGeofenceEvent: async (_parent, args, ctx) => {
    const payload = CreateGeofenceEventInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.geofenceEvents")
      .values({
        ...payload,
        eventType: payload.eventType
          ? TmsGeofenceEventTypeEnum[payload.eventType]
          : TmsGeofenceEventTypeEnum.ENTER,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Get geofence name for event
    const geofence = await ctx.db
      .selectFrom("tms.geofences")
      .select("name")
      .where("id", "=", result.geofenceId)
      .executeTakeFirstOrThrow();

    // Publish geofence event
    const eventType = result.eventType as TmsGeofenceEventTypeEnum;
    if (eventType === "ENTER") {
      ctx.pubsub.publish("tms.geofence.entered", {
        ...result,
        geofenceName: geofence.name,
      });
    } else if (eventType === "EXIT") {
      ctx.pubsub.publish("tms.geofence.exited", {
        ...result,
        geofenceName: geofence.name,
      });
    }

    return result as unknown as GeofenceEvents;
  },
  updateGeofenceEvent: async (_parent, args, ctx) => {
    const payload = UpdateGeofenceEventInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.geofenceEvents")
      .set({
        ...payload,
        eventType: payload.eventType
          ? TmsGeofenceEventTypeEnum[payload.eventType]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as GeofenceEvents;
  },
};
