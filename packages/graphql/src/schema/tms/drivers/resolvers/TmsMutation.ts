import { TmsDriverStatusEnum } from "../../../../db.types";
import {
  CreateDriverInputSchema,
  Drivers,
  UpdateDriverInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";

export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createDriver" | "removeDriver" | "updateDriver"
> = {
  createDriver: async (_parent, args, ctx) => {
    const payload = CreateDriverInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.drivers")
      .values({
        ...payload,
        status: payload.status
          ? TmsDriverStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Drivers;
  },
  updateDriver: async (_parent, args, ctx) => {
    const payload = UpdateDriverInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousDriver = await ctx.db
      .selectFrom("tms.drivers")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("tms.drivers")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousDriver.status) {
      ctx.pubsub.publish("tms.driver.statusChanged", {
        id: result.id,
        newStatus: payload.status as TmsDriverStatusEnum,
        previousStatus: previousDriver.status as TmsDriverStatusEnum,
      });
    }

    return result as unknown as Drivers;
  },
  removeDriver: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.drivers")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
