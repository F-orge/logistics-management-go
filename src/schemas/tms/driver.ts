import { z } from 'zod';
import { TmsDriverStatusEnum } from '@/db/types';

export const tmsDriverSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  licenseNumber: z.string().nullable(),
  phone: z.string().nullable(),
  status: z.enum(TmsDriverStatusEnum).nullable(),
  hiredAt: z.iso.datetime().nullable(),
  terminatedAt: z.iso.datetime().nullable(),
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
