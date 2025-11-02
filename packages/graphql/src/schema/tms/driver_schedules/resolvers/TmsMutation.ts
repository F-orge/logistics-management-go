import { TmsDriverScheduleReasonEnum } from "../../../../db.types";
import {
  CreateDriverScheduleInputSchema,
  DriverSchedules,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createDriverSchedule'|'removeDriverSchedule'|'updateDriverSchedule'> = {
  createDriverSchedule: async (_parent, args, ctx) => {
    const payload = CreateDriverScheduleInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.driverSchedules")
      .values({
        ...payload,
        reason: payload.reason
          ? TmsDriverScheduleReasonEnum[payload.reason]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DriverSchedules;
  },
  updateDriverSchedule: async (_parent, args, ctx) => {
    const payload = CreateDriverScheduleInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.driverSchedules")
      .set({
        ...payload,
        reason: payload.reason
          ? TmsDriverScheduleReasonEnum[payload.reason]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DriverSchedules;
  },
  removeDriverSchedule: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.driverSchedules")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
