import { z } from 'zod'
import { TmsDriverScheduleReasonEnum } from '@/db.types'

export const DriverScheduleSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  driverId: z.uuid({ message: 'Invalid UUID format for driver ID' }),
  startDate: z.date({ message: 'Invalid date format for start date' }),
  endDate: z.date({ message: 'Invalid date format for end date' }),
  reason: z
    .enum(TmsDriverScheduleReasonEnum, {
      message: 'Invalid driver schedule reason',
    })
    .optional()
    .nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsDriverSchedule = z.infer<typeof DriverScheduleSchema>

export const DriverScheduleInsertSchema = DriverScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const DriverScheduleUpdateSchema = DriverScheduleInsertSchema.partial()
