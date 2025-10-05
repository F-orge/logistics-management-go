import { z } from 'zod';
import { WmsReturnStatusEnum } from '@/db/types';

export const wmsReturnSchema = z.object({
  id: z.uuid(),
  referenceNumber: z
    .string()
    .min(1, { error: 'Reference number is required' })
    .max(64, { error: 'Reference number must be at most 64 characters' }),
  status: z.enum(WmsReturnStatusEnum).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsReturn = z.infer<typeof wmsReturnSchema>;

export const wmsReturnInsertSchema = wmsReturnSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsReturnUpdateSchema = wmsReturnInsertSchema.partial();
