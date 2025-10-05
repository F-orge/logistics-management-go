import { z } from 'zod';
import { TmsDriverScheduleReasonEnum } from '@/db/types';

export const tmsDriverScheduleSchema = z.object({
  id: z.string(),
  driverId: z.string(),
  startAt: z.iso.datetime().nullable(),
  endAt: z.iso.datetime().nullable(),
  reason: z.enum(TmsDriverScheduleReasonEnum).nullable(),
  notes: z.string().nullable(),
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
