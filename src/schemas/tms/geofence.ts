import { z } from 'zod';

export const tmsGeofenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  coordinates: z.string(), // GeoJSON or WKT as string
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsGeofence = z.infer<typeof tmsGeofenceSchema>;

export const tmsGeofenceInsertSchema = tmsGeofenceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsGeofenceUpdateSchema = tmsGeofenceInsertSchema.partial();
