import { z } from 'zod';

export const tmsGpsPingSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  vehicleId: z.uuid({ message: 'Invalid UUID format for vehicle ID' }),
  latitude: z.coerce
    .number({ message: 'Latitude must be a number' })
    .min(-90, { error: 'Latitude must be at least -90' })
    .max(90, { error: 'Latitude must be at most 90' }),
  longitude: z.coerce
    .number({ message: 'Longitude must be a number' })
    .min(-180, { error: 'Longitude must be at least -180' })
    .max(180, { error: 'Longitude must be at most 180' }),
  timestamp: z.date({ message: 'Invalid date format for timestamp' }),
});

export type TmsGpsPing = z.infer<typeof tmsGpsPingSchema>;

export const tmsGpsPingInsertSchema = tmsGpsPingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const tmsGpsPingUpdateSchema = tmsGpsPingInsertSchema.partial();
