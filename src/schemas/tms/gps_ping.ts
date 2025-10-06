import { z } from 'zod';

export const tmsGpsPingSchema = z.object({
  id: z.uuid(),
  vehicleId: z.uuid(),
  latitude: z.coerce
    .number()
    .min(-90, { error: 'Latitude must be at least -90' })
    .max(90, { error: 'Latitude must be at most 90' }),
  longitude: z.coerce
    .number()
    .min(-180, { error: 'Longitude must be at least -180' })
    .max(180, { error: 'Longitude must be at most 180' }),
  timestamp: z.iso.datetime(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsGpsPing = z.infer<typeof tmsGpsPingSchema>;

export const tmsGpsPingInsertSchema = tmsGpsPingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const tmsGpsPingUpdateSchema = tmsGpsPingInsertSchema.partial();
