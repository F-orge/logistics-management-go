import { z } from 'zod'
import { DmsDeliveryFailureReasonEnum, DmsDeliveryTaskStatusEnum } from '@/db.types'

export const DeliveryTaskSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  deliveryRouteId: z.uuid({
    message: 'Invalid UUID format for delivery route ID',
  }),
  packageId: z.uuid({ message: 'Invalid UUID format for package ID' }),
  status: z
    .enum(DmsDeliveryTaskStatusEnum, {
      message: 'Invalid delivery task status',
    })
    .optional()
    .nullable(),
  failureReason: z
    .enum(DmsDeliveryFailureReasonEnum, {
      message: 'Invalid delivery failure reason',
    })
    .optional()
    .nullable(),
  estimatedArrivalTime: z
    .date({ message: 'Invalid date format for estimated arrival time' })
    .optional()
    .nullable(),
  deliveryTime: z.date({ message: 'Invalid date format for delivery time' }).optional().nullable(),
  deliveryAddress: z
    .string()
    .min(1, { error: 'Delivery address is required' })
    .max(255, { error: 'Delivery address must be at most 255 characters' }),
  recipientName: z
    .string()
    .min(1, { error: 'Recipient name is required' })
    .max(127, { error: 'Recipient name must be at most 127 characters' })
    .optional()
    .nullable(),
  recipientPhone: z
    .string()
    .min(1, { error: 'Recipient phone is required' })
    .max(32, { error: 'Recipient phone must be at most 32 characters' })
    .optional()
    .nullable(),
  deliveryInstructions: z
    .string()
    .min(1, { error: 'Delivery instructions are required' })
    .max(1024, {
      error: 'Delivery instructions must be at most 1024 characters',
    })
    .optional()
    .nullable(),
  actualArrivalTime: z
    .date({ message: 'Invalid date format for actual arrival time' })
    .optional()
    .nullable(),
  routeSequence: z.coerce
    .number({ message: 'Route sequence must be a number' })
    .int({ message: 'Route sequence must be an integer' })
    .min(0, { message: 'Route sequence must be at least 0' }),
  attemptCount: z.coerce
    .number({ message: 'Attempt count must be a number' })
    .int({ message: 'Attempt count must be an integer' })
    .min(0, { message: 'Attempt count must be at least 0' })
    .optional()
    .nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})
