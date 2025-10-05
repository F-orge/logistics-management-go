import { z } from 'zod';

export const dmsDriverLocationSchema = z.object({
  id: z.string(),
  driverId: z.uuid(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
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
