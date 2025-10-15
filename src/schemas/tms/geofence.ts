import { z } from 'zod'

export const tmsGeofenceSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Geofence name must be a string' })
    .min(1, { error: 'Geofence name is required' })
    .max(255, { error: 'Geofence name must be at most 255 characters' }),
  latitude: z.coerce
    .number({ message: 'Latitude must be a number' })
    .min(-90, { error: 'Latitude must be at least -90' })
    .max(90, { error: 'Latitude must be at most 90' }),
  longitude: z.coerce
    .number({ message: 'Longitude must be a number' })
    .min(-180, { error: 'Longitude must be at least -180' })
    .max(180, { error: 'Longitude must be at most 180' }),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsGeofence = z.infer<typeof tmsGeofenceSchema>

export const tmsGeofenceInsertSchema = tmsGeofenceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const tmsGeofenceUpdateSchema = tmsGeofenceInsertSchema.partial()
