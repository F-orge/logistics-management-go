import { z } from 'zod';
import { WmsReturnStatusEnum } from '@/db/types';

export const wmsReturnSchema = z.object({
  id: z.uuid(),
  clientId: z.uuid(),
  returnNumber: z
    .string()
    .min(1, { error: 'Return number is required' })
    .max(64, { error: 'Return number must be at most 64 characters' }),
  salesOrderId: z.uuid().nullable().optional(),
  status: z.enum(WmsReturnStatusEnum).nullable(),
  reason: z.string().nullable().optional(),
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
