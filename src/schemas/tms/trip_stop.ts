import { z } from 'zod';
import { TmsTripStopStatusEnum } from '@/db/types';

export const tmsTripStopSchema = z.object({
  id: z.string(),
  tripId: z.uuid(),
  status: z.enum(TmsTripStopStatusEnum).nullable(),
  address: z.string(),
  arrivalAt: z.iso.datetime().nullable(),
  departureAt: z.iso.datetime().nullable(),
  notes: z.string().nullable(),
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
