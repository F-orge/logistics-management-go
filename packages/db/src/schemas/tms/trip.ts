import { z } from 'zod'
import { TmsTripStatusEnum } from '@/db.types'
import { ExpenseInsertSchema } from './expense'
import { GpsPingInsertSchema } from './gps_ping'
import { ProofOfDeliveryInsertSchema } from './proof_of_delivery'
import { TripStopInsertSchema } from './trip_stop'

export const TripSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  driverId: z.uuid({ message: 'Invalid UUID format for driver ID' }).optional().nullable(),
  vehicleId: z.uuid({ message: 'Invalid UUID format for vehicle ID' }).optional().nullable(),
  status: z.enum(TmsTripStatusEnum, { message: 'Invalid trip status' }).optional().nullable(),
  endLocation: z.string().optional().nullable(),
  endTime: z.date().optional().nullable(),
  startLocation: z.string().optional().nullable(),
  startTime: z.date().optional().nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsTrip = z.infer<typeof TripSchema>

export const TripInsertSchema = TripSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  stops: z.array(TripStopInsertSchema).optional().nullable(),
  expenses: z.array(ExpenseInsertSchema).optional().nullable(),
  gpsPings: z.array(GpsPingInsertSchema).optional().nullable(),
  proofOfDeliveries: z.array(ProofOfDeliveryInsertSchema).optional().nullable(),
})

export const TripUpdateSchema = TripInsertSchema.partial()
