import { z } from 'zod'
import { WmsReturnStatusEnum } from '../../db.types'

export const ReturnSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  clientId: z.uuid({ message: 'Invalid UUID format for client ID' }),
  returnNumber: z
    .string({ message: 'Return number must be a string' })
    .min(1, { error: 'Return number is required' })
    .max(64, { error: 'Return number must be at most 64 characters' }),
  salesOrderId: z
    .uuid({ message: 'Invalid UUID format for sales order ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  status: z.enum(WmsReturnStatusEnum, { message: 'Invalid return status' }).optional().nullable(),
  reason: z
    .string({ message: 'Reason must be a string' })
    .min(1, { error: 'Reason cannot be empty' })
    .max(1024, { error: 'Reason must be at most 1024 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type WmsReturn = z.infer<typeof ReturnSchema>

export const ReturnInsertSchema = ReturnSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const ReturnUpdateSchema = ReturnInsertSchema.partial()
