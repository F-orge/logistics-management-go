import { z } from 'zod';
import { DmsDeliveryRouteStatusEnum } from '@/db/types';

export const dmsDeliveryRouteSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  status: z
    .enum(DmsDeliveryRouteStatusEnum, {
      message: 'Invalid delivery route status',
    })
    .nullable(),
  routeDate: z.iso.datetime({ message: 'Invalid date format for route date' }),
  startedAt: z.iso
    .datetime({ message: 'Invalid date format for started at' })
    .nullable(),
  completedAt: z.iso
    .datetime({ message: 'Invalid date format for completed at' })
    .nullable(),
  driverId: z.uuid({ message: 'Invalid UUID format for driver ID' }),
  actualDurationMinutes: z
    .number({ message: 'Actual duration must be a number' })
    .int({ message: 'Actual duration must be an integer' })
    .min(0, { message: 'Actual duration must be at least 0' })
    .nullable(),
  estimatedDurationMinutes: z
    .number({ message: 'Estimated duration must be a number' })
    .int({ message: 'Estimated duration must be an integer' })
    .min(0, { message: 'Estimated duration must be at least 0' })
    .nullable(),
  optimizedRouteData: z
    .string({ message: 'Optimized route data must be a string' })
    .min(1, { error: 'Optimized route data cannot be empty' })
    .max(4096, {
      error: 'Optimized route data must be at most 4096 characters',
    })
    .nullable(),
  totalDistanceKm: z
    .number({ message: 'Total distance must be a number' })
    .min(0, { message: 'Total distance must be at least 0' })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type DmsDeliveryRoute = z.infer<typeof dmsDeliveryRouteSchema>;

export const dmsDeliveryRouteInsertSchema = dmsDeliveryRouteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDeliveryRouteUpdateSchema =
  dmsDeliveryRouteInsertSchema.partial();
