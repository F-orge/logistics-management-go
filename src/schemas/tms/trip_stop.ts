import { z } from 'zod';
import { TmsTripStopStatusEnum } from '@/db/types';

export const tmsTripStopSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  tripId: z.uuid({ message: 'Invalid UUID format for trip ID' }),
  status: z
    .enum(TmsTripStopStatusEnum, { message: 'Invalid trip stop status' })
    .nullable(),
  address: z
    .string({ message: 'Address must be a string' })
    .min(1, { error: 'Address is required' })
    .max(255, { error: 'Address must be at most 255 characters' }),
  arrivalAt: z.iso
    .datetime({ message: 'Invalid date format for arrival at' })
    .nullable(),
  departureAt: z.iso
    .datetime({ message: 'Invalid date format for departure at' })
    .nullable(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type TmsTripStop = z.infer<typeof tmsTripStopSchema>;

export const tmsTripStopInsertSchema = tmsTripStopSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsTripStopUpdateSchema = tmsTripStopInsertSchema.partial();
