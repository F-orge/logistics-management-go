import { z } from 'zod';
import { WmsProductStatusEnum } from '@/db/types';

export const wmsProductSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Name is required' })
    .max(127, { error: 'Name must be at most 127 characters' }),
  sku: z
    .string()
    .min(1, { error: 'SKU is required' })
    .max(64, { error: 'SKU must be at most 64 characters' }),
  status: z.enum(WmsProductStatusEnum).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsProduct = z.infer<typeof wmsProductSchema>;

export const wmsProductInsertSchema = wmsProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsProductUpdateSchema = wmsProductInsertSchema.partial();
