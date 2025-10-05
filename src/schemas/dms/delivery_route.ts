import { z } from 'zod';
import { DmsDeliveryRouteStatusEnum } from '@/db/types';

export const dmsDeliveryRouteSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(DmsDeliveryRouteStatusEnum).nullable(),
  scheduledDate: z.iso.datetime().nullable(),
  startedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  driverId: z.string().nullable(),
  vehicleId: z.string().nullable(),
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
