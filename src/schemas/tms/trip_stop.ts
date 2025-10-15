import { z } from 'zod'
import { TmsTripStopStatusEnum } from '@/db/types'

export const tmsTripStopSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  tripId: z.uuid({ message: 'Invalid UUID format for trip ID' }),
  status: z
    .enum(TmsTripStopStatusEnum, { message: 'Invalid trip stop status' })
    .optional()
    .nullable(),
  address: z
    .string({ message: 'Address must be a string' })
    .min(1, { error: 'Address is required' })
    .max(255, { error: 'Address must be at most 255 characters' })
    .optional()
    .nullable(),
  actualArrivalTime: z
    .date({ message: 'Invalid date format for actual arrival time' })
    .optional()
    .nullable(),
  actualDepartureTime: z
    .date({ message: 'Invalid date format for actual departure time' })
    .optional()
    .nullable(),
  estimatedArrivalTime: z
    .date({ message: 'Invalid date format for estimated arrival time' })
    .optional()
    .nullable(),
  estimatedDepartureTime: z
    .date({ message: 'Invalid date format for estimated departure time' })
    .optional()
    .nullable(),
  sequence: z.coerce
    .number({ message: 'Sequence must be a number' })
    .int({ message: 'Sequence must be an integer' })
    .min(0, { message: 'Sequence must be at least 0' }),
  shipmentId: z.uuid({ message: 'Invalid UUID format for shipment ID' }).optional().nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsTripStop = z.infer<typeof tmsTripStopSchema>

export const tmsTripStopInsertSchema = tmsTripStopSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const tmsTripStopUpdateSchema = tmsTripStopInsertSchema.partial()
