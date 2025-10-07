import { z } from 'zod';
import { DmsProofOfDeliveryTypeEnum } from '@/db/types';

export const dmsProofOfDeliverySchema = z.object({
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
    .optional(),
  latitude: z
    .number({ message: 'Latitude must be a number' })
    .min(-90, { message: 'Latitude must be at least -90' })
    .max(90, { message: 'Latitude must be at most 90' })
    .optional(),
  longitude: z
    .number({ message: 'Longitude must be a number' })
    .min(-180, { message: 'Longitude must be at least -180' })
    .max(180, { message: 'Longitude must be at most 180' })
    .optional(),
  recipientName: z
    .string({ message: 'Recipient name must be a string' })
    .min(1, { error: 'Recipient name is required' })
    .max(127, { error: 'Recipient name must be at most 127 characters' })
    .optional(),
  signatureData: z
    .string({ message: 'Signature data must be a string' })
    .min(1, { error: 'Signature data is required' })
    .max(4096, { error: 'Signature data must be at most 4096 characters' })
    .optional(),
  timestamp: z
    .date({ message: 'Invalid date format for timestamp' })
    .optional(),
  verificationCode: z
    .string({ message: 'Verification code must be a string' })
    .min(1, { error: 'Verification code is required' })
    .max(64, { error: 'Verification code must be at most 64 characters' })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type DmsProofOfDelivery = z.infer<typeof dmsProofOfDeliverySchema>;

export const dmsProofOfDeliveryInsertSchema = dmsProofOfDeliverySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsProofOfDeliveryUpdateSchema =
  dmsProofOfDeliveryInsertSchema.partial();
