import { z } from 'zod';
import { TmsDriverStatusEnum } from '@/db/types';

export const tmsDriverSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Driver name must be a string' })
    .min(1, { error: 'Driver name is required' })
    .max(255, { error: 'Driver name must be at most 255 characters' }),
  licenseNumber: z
    .string({ message: 'License number must be a string' })
    .min(1, { error: 'License number is required' })
    .max(64, { error: 'License number must be at most 64 characters' }),
  phone: z
    .string({ message: 'Phone number must be a string' })
    .min(1, { error: 'Phone is required' })
    .max(32, { error: 'Phone must be at most 32 characters' })
    .nullable(),
  status: z
    .enum(TmsDriverStatusEnum, { message: 'Invalid driver status' })
    .nullable(),
  hiredAt: z.iso
    .datetime({ message: 'Invalid date format for hired at' })
    .nullable(),
  terminatedAt: z.iso
    .datetime({ message: 'Invalid date format for terminated at' })
    .nullable(),
  userId: z.uuid({ message: 'Invalid UUID format for user ID' }),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type TmsDriver = z.infer<typeof tmsDriverSchema>;

export const tmsDriverInsertSchema = tmsDriverSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsDriverUpdateSchema = tmsDriverInsertSchema.partial();
