import { z } from 'zod';
import { TmsGeofenceEventTypeEnum } from '@/db/types';

export const tmsGeofenceEventSchema = z.object({
  id: z.uuid(),
  vehicleId: z.uuid(),
  geofenceId: z.uuid(),
  eventType: z.enum(TmsGeofenceEventTypeEnum),
  timestamp: z.iso.datetime(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsGeofenceEvent = z.infer<typeof tmsGeofenceEventSchema>;

export const tmsGeofenceEventInsertSchema = tmsGeofenceEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const tmsGeofenceEventUpdateSchema =
  tmsGeofenceEventInsertSchema.partial();
