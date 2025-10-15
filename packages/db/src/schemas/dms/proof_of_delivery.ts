import { z } from 'zod'
import { DmsProofOfDeliveryTypeEnum } from '@/db.types'

export const ProofOfDeliverySchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  deliveryTaskId: z.uuid({
    message: 'Invalid UUID format for delivery task ID',
  }),
  type: z.enum(DmsProofOfDeliveryTypeEnum, {
    message: 'Invalid proof of delivery type',
  }),
  filePath: z
    .string({ message: 'File path must be a string' })
    .min(1, { error: 'File path is required' })
    .max(1024, { error: 'File path must be at most 1024 characters' })
    .optional()
    .nullable(),
  latitude: z.coerce
    .number({ message: 'Latitude must be a number' })
    .min(-90, { message: 'Latitude must be at least -90' })
    .max(90, { message: 'Latitude must be at most 90' })
    .optional()
    .nullable(),
  longitude: z.coerce
    .number({ message: 'Longitude must be a number' })
    .min(-180, { message: 'Longitude must be at least -180' })
    .max(180, { message: 'Longitude must be at most 180' })
    .optional()
    .nullable(),
  recipientName: z
    .string({ message: 'Recipient name must be a string' })
    .min(1, { error: 'Recipient name is required' })
    .max(127, { error: 'Recipient name must be at most 127 characters' })
    .optional()
    .nullable(),
  signatureData: z
    .string({ message: 'Signature data must be a string' })
    .min(1, { error: 'Signature data is required' })
    .max(4096, { error: 'Signature data must be at most 4096 characters' })
    .optional()
    .nullable(),
  timestamp: z.date({ message: 'Invalid date format for timestamp' }).optional().nullable(),
  verificationCode: z
    .string({ message: 'Verification code must be a string' })
    .min(1, { error: 'Verification code is required' })
    .max(64, { error: 'Verification code must be at most 64 characters' })
    .optional()
    .nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})
