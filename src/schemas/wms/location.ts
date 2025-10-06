import { z } from 'zod';
import { WmsLocationTypeEnum } from '@/db/types';

export const wmsLocationSchema = z.object({
  id: z.uuid(),
  warehouseId: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Name is required' })
    .max(127, { error: 'Name must be at most 127 characters' }),
  type: z.enum(WmsLocationTypeEnum),
  barcode: z.string().nullable().optional(),
  hazmatApproved: z.boolean().nullable().optional(),
  isActive: z.boolean().nullable().optional(),
  isPickable: z.boolean().nullable().optional(),
  isReceivable: z.boolean().nullable().optional(),
  level: z.number().nullable().optional(),
  maxPallets: z.number().nullable().optional(),
  maxVolume: z.number().nullable().optional(),
  maxWeight: z.number().nullable().optional(),
  parentLocationId: z.uuid().nullable().optional(),
  path: z.string().nullable().optional(),
  temperatureControlled: z.boolean().nullable().optional(),
  xCoordinate: z.number().nullable().optional(),
  yCoordinate: z.number().nullable().optional(),
  zCoordinate: z.number().nullable().optional(),
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
