import { z } from 'zod';
import { TmsDriverScheduleReasonEnum } from '@/db/types';

export const tmsDriverScheduleSchema = z.object({
  id: z.uuid(),
  driverId: z.uuid(),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime(),
  reason: z.enum(TmsDriverScheduleReasonEnum).nullable(),
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
