import { z } from 'zod';
import { WmsLocationTypeEnum } from '@/db/types';

export const wmsLocationSchema = z.object({
  id: z.uuid(),
  warehouseId: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Name is required' })
    .max(127, { error: 'Name must be at most 127 characters' }),
  type: z.enum(WmsLocationTypeEnum).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsLocation = z.infer<typeof wmsLocationSchema>;

export const wmsLocationInsertSchema = wmsLocationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsLocationUpdateSchema = wmsLocationInsertSchema.partial();
