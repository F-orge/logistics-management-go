import { z } from 'zod';
import { TmsDriverScheduleReasonEnum } from '@/db/types';

export const tmsDriverScheduleSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  driverId: z.uuid({ message: 'Invalid UUID format for driver ID' }),
  startDate: z.iso.datetime({ message: 'Invalid date format for start date' }),
  endDate: z.iso.datetime({ message: 'Invalid date format for end date' }),
  reason: z
    .enum(TmsDriverScheduleReasonEnum, {
      message: 'Invalid driver schedule reason',
    })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type TmsDriverSchedule = z.infer<typeof tmsDriverScheduleSchema>;

export const tmsDriverScheduleInsertSchema = tmsDriverScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsDriverScheduleUpdateSchema =
  tmsDriverScheduleInsertSchema.partial();
