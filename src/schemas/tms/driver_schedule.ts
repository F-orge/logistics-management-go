import { z } from 'zod';
import { TmsDriverScheduleReasonEnum } from '@/db/types';

export const tmsDriverScheduleSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  driverId: z.uuid({ message: 'Invalid UUID format for driver ID' }),
  startDate: z.date({ message: 'Invalid date format for start date' }),
  endDate: z.date({ message: 'Invalid date format for end date' }),
  reason: z
    .enum(TmsDriverScheduleReasonEnum, {
      message: 'Invalid driver schedule reason',
    })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type TmsDriverSchedule = z.infer<typeof tmsDriverScheduleSchema>;

export const tmsDriverScheduleInsertSchema = tmsDriverScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsDriverScheduleUpdateSchema =
  tmsDriverScheduleInsertSchema.partial();
