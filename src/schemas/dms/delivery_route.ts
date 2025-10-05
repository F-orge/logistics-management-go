import { z } from 'zod';
import { DmsDeliveryRouteStatusEnum } from '@/db/types';

export const dmsDeliveryRouteSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Route name is required' })
    .max(255, { error: 'Route name must be at most 255 characters' }),
  status: z.enum(DmsDeliveryRouteStatusEnum).nullable(),
  scheduledDate: z.iso.datetime().nullable(),
  startedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  driverId: z.uuid().nullable(),
  vehicleId: z.uuid().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDeliveryRoute = z.infer<typeof dmsDeliveryRouteSchema>;

export const dmsDeliveryRouteInsertSchema = dmsDeliveryRouteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDeliveryRouteUpdateSchema =
  dmsDeliveryRouteInsertSchema.partial();
