import { z } from 'zod';
import { TmsDriverStatusEnum } from '@/db/types';

export const tmsDriverSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Driver name is required' })
    .max(255, { error: 'Driver name must be at most 255 characters' }),
  licenseNumber: z
    .string()
    .min(1, { error: 'License number is required' })
    .max(64, { error: 'License number must be at most 64 characters' }),
  phone: z
    .string()
    .min(1, { error: 'Phone is required' })
    .max(32, { error: 'Phone must be at most 32 characters' })
    .nullable(),
  status: z.enum(TmsDriverStatusEnum).nullable(),
  hiredAt: z.iso.datetime().nullable(),
  terminatedAt: z.iso.datetime().nullable(),
  userId: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsDriver = z.infer<typeof tmsDriverSchema>;

export const tmsDriverInsertSchema = tmsDriverSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsDriverUpdateSchema = tmsDriverInsertSchema.partial();
