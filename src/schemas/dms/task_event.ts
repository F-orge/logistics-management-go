import { z } from 'zod';
import { DmsTaskEventStatusEnum } from '@/db/types';

export const dmsTaskEventSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  deliveryTaskId: z.uuid({
    message: 'Invalid UUID format for delivery task ID',
  }),
  status: z.enum(DmsTaskEventStatusEnum, {
    message: 'Invalid task event status',
  }),
  timestamp: z
    .date({ message: 'Invalid date format for timestamp' })
    .optional()
    .nullable(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional()
    .nullable(),
  latitude: z
    .number({ message: 'Latitude must be a number' })
    .min(-90, { message: 'Latitude must be at least -90' })
    .max(90, { message: 'Latitude must be at most 90' })
    .optional()
    .nullable(),
  longitude: z
    .number({ message: 'Longitude must be a number' })
    .min(-180, { message: 'Longitude must be at least -180' })
    .max(180, { message: 'Longitude must be at most 180' })
    .optional()
    .nullable(),
  reason: z
    .string({ message: 'Reason must be a string' })
    .min(1, { error: 'Reason is required' })
    .max(255, { error: 'Reason must be at most 255 characters' })
    .optional()
    .nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type DmsTaskEvent = z.infer<typeof dmsTaskEventSchema>;

export const dmsTaskEventInsertSchema = dmsTaskEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsTaskEventUpdateSchema = dmsTaskEventInsertSchema.partial();
