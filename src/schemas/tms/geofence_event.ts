import { z } from 'zod';
import { TmsGeofenceEventTypeEnum } from '@/db/types';

export const tmsGeofenceEventSchema = z.object({
  id: z.string(),
  geofenceId: z.uuid(),
  tripId: z.uuid().nullable(),
  eventType: z.enum(TmsGeofenceEventTypeEnum).nullable(),
  eventAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsGeofenceEvent = z.infer<typeof tmsGeofenceEventSchema>;

export const tmsGeofenceEventInsertSchema = tmsGeofenceEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsGeofenceEventUpdateSchema =
  tmsGeofenceEventInsertSchema.partial();
