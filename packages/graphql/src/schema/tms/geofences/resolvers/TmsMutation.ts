import {
  CreateGeofenceInputSchema,
  Geofences,
  UpdateGeofenceInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createGeofence'|'removeGeofence'|'updateGeofence'> = {
  createGeofence: async (_parent, args, ctx) => {
    const payload = CreateGeofenceInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.geofences")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Geofences;
  },
  updateGeofence: async (_parent, args, ctx) => {
    const payload = UpdateGeofenceInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.geofences")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Geofences;
  },
  removeGeofence: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.geofences")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
