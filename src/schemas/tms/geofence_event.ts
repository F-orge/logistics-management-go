import { z } from 'zod';
import { TmsGeofenceEventTypeEnum } from '@/db/types';

export const tmsGeofenceEventSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  vehicleId: z.uuid({ message: 'Invalid UUID format for vehicle ID' }),
  geofenceId: z.uuid({ message: 'Invalid UUID format for geofence ID' }),
  eventType: z.enum(TmsGeofenceEventTypeEnum, {
    message: 'Invalid geofence event type',
  }),
  timestamp: z.date({ message: 'Invalid date format for timestamp' }),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
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
