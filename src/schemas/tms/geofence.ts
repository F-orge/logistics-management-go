import { z } from 'zod';

export const tmsGeofenceSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Geofence name must be a string' })
    .min(1, { error: 'Geofence name is required' })
    .max(255, { error: 'Geofence name must be at most 255 characters' }),
  coordinates: z
    .string({ message: 'Coordinates must be a string' })
    .min(1, { error: 'Coordinates are required' })
    .max(8192, { error: 'Coordinates must be at most 8192 characters' })
    .optional()
    .nullable(), // GeoJSON or WKT as string
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type TmsGeofence = z.infer<typeof tmsGeofenceSchema>;

export const tmsGeofenceInsertSchema = tmsGeofenceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsGeofenceUpdateSchema = tmsGeofenceInsertSchema.partial();
