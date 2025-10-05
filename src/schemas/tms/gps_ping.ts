import { z } from 'zod';

export const tmsGpsPingSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  recordedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsGpsPing = z.infer<typeof tmsGpsPingSchema>;

export const tmsGpsPingInsertSchema = tmsGpsPingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsGpsPingUpdateSchema = tmsGpsPingInsertSchema.partial();
