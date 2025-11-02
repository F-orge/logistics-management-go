import { TmsTripStatusEnum } from "../../../../db.types";
import {
  CreateTripInputSchema,
  Trips,
  UpdateTripInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";

export const TmsMutation: Pick<TmsMutationResolvers, 'createTrip'|'removeTrip'|'updateTrip'> = {
  createTrip: async (_parent, args, ctx) => {
    const payload = CreateTripInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.trips")
      .values({
        ...payload,
        status: payload.status ? TmsTripStatusEnum[payload.status] : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish created event
    await ctx.pubsub.publish("tms.trip.created", result);

    return result as unknown as Trips;
  },
  updateTrip: async (_parent, args, ctx) => {
    const payload = UpdateTripInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousTrip = await ctx.db
      .selectFrom("tms.trips")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("tms.trips")
      .set({
        ...payload,
        status: payload.status ? TmsTripStatusEnum[payload.status] : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousTrip.status) {
      const status = payload.status as TmsTripStatusEnum;

      await ctx.pubsub.publish("tms.trip.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousTrip.status as TmsTripStatusEnum,
        driverId: result.driverId,
        vehicleId: result.vehicleId,
      });

      // Publish specific status events
      if (status === "IN_PROGRESS") {
        await ctx.pubsub.publish("tms.trip.started", result);
      } else if (status === "COMPLETED") {
        await ctx.pubsub.publish("tms.trip.completed", result);
      } else if (status === "CANCELLED") {
        await ctx.pubsub.publish("tms.trip.cancelled", result);
      }
    }

    return result as unknown as Trips;
  },
  removeTrip: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.trips")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
