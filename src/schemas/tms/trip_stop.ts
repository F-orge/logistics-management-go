import { z } from 'zod';
import { TmsTripStopStatusEnum } from '@/db/types';

export const tmsTripStopSchema = z.object({
  id: z.uuid(),
  tripId: z.uuid(),
  status: z.enum(TmsTripStopStatusEnum).nullable(),
  address: z
    .string()
    .min(1, { error: 'Address is required' })
    .max(255, { error: 'Address must be at most 255 characters' }),
  arrivalAt: z.iso.datetime().nullable(),
  departureAt: z.iso.datetime().nullable(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsTripStop = z.infer<typeof tmsTripStopSchema>;

export const tmsTripStopInsertSchema = tmsTripStopSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsTripStopUpdateSchema = tmsTripStopInsertSchema.partial();
