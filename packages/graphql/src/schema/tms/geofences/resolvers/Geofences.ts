import { GeofenceEvents } from "../../../../zod.schema";
import type { GeofencesResolvers } from "./../../../types.generated";
export const Geofences: GeofencesResolvers = {
  events: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("tms.geofenceEvents")
      .selectAll("tms.geofenceEvents")
      .where("tms.geofenceEvents.geofenceId", "=", parent.id as string)
      .execute();

    return results as unknown as GeofenceEvents[];
  },
};
