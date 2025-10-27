import { TmsTripStopStatusEnum } from "../../../../db.types";
import {
  CreateTripStopInputSchema,
  TripStops,
  UpdateTripStopInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";

export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createTripStop" | "removeTripStop" | "updateTripStop"
> = {
  createTripStop: async (_parent, args, ctx) => {
    const payload = CreateTripStopInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.tripStops")
      .values({
        ...payload,
        status: payload.status
          ? TmsTripStopStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as TripStops;
  },
  updateTripStop: async (_parent, args, ctx) => {
    const payload = UpdateTripStopInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousStop = await ctx.db
      .selectFrom("tms.tripStops")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("tms.tripStops")
      .set({
        ...payload,
        status: payload.status
          ? TmsTripStopStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed events
    if (payload.status && payload.status !== previousStop.status) {
      const status = payload.status as TmsTripStopStatusEnum;

      if (status === "ARRIVED") {
        ctx.pubsub.publish("tms.tripStop.arrived", result);
      } else if (status === "COMPLETED") {
        ctx.pubsub.publish("tms.tripStop.completed", result);
      } else if (status === "SKIPPED") {
        ctx.pubsub.publish("tms.tripStop.skipped", {
          ...result,
          reason: null,
        });
      }
    }

    return result as unknown as TripStops;
  },
  removeTripStop: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.tripStops")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
