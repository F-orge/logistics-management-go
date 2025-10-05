import { z } from 'zod';
import { TmsDriverScheduleReasonEnum } from '@/db/types';

export const tmsDriverScheduleSchema = z.object({
  id: z.uuid(),
  driverId: z.uuid(),
  startAt: z.iso.datetime().nullable(),
  endAt: z.iso.datetime().nullable(),
  reason: z.enum(TmsDriverScheduleReasonEnum).nullable(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsDriverSchedule = z.infer<typeof tmsDriverScheduleSchema>;

export const tmsDriverScheduleInsertSchema = tmsDriverScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsDriverScheduleUpdateSchema =
  tmsDriverScheduleInsertSchema.partial();
