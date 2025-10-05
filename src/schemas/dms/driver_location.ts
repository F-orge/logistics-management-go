import { z } from 'zod';

export const dmsDriverLocationSchema = z.object({
  id: z.uuid(),
  driverId: z.uuid(),
  latitude: z.coerce
    .number()
    .min(-90, { error: 'Latitude must be at least -90' })
    .max(90, { error: 'Latitude must be at most 90' }),
  longitude: z.coerce
    .number()
    .min(-180, { error: 'Longitude must be at least -180' })
    .max(180, { error: 'Longitude must be at most 180' }),
  recordedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDriverLocation = z.infer<typeof dmsDriverLocationSchema>;

export const dmsDriverLocationInsertSchema = dmsDriverLocationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDriverLocationUpdateSchema =
  dmsDriverLocationInsertSchema.partial();
