import { z } from 'zod'
import { TmsDriverStatusEnum } from '@/db/types'

export const tmsDriverSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  licenseNumber: z
    .string({ message: 'License number must be a string' })
    .min(1, { error: 'License number is required' })
    .max(64, { error: 'License number must be at most 64 characters' }),
  contactNumber: z
    .string({
      message: 'Contact number must be a string',
    })
    .optional()
    .nullable(),
  licenseExpiryDate: z
    .date({ message: 'Invalid date format for license expiry date' })
    .optional()
    .nullable(),
  status: z.enum(TmsDriverStatusEnum, { message: 'Invalid driver status' }).optional().nullable(),
  userId: z.uuid({ message: 'Invalid UUID format for user ID' }),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsDriver = z.infer<typeof tmsDriverSchema>

export const tmsDriverInsertSchema = tmsDriverSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const tmsDriverUpdateSchema = tmsDriverInsertSchema.partial()
