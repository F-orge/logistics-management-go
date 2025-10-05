import { z } from 'zod';

export const wmsWarehouseSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Name is required' })
    .max(127, { error: 'Name must be at most 127 characters' }),
  location: z
    .string()
    .min(1, { error: 'Location is required' })
    .max(255, { error: 'Location must be at most 255 characters' }),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsWarehouse = z.infer<typeof wmsWarehouseSchema>;

export const wmsWarehouseInsertSchema = wmsWarehouseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsWarehouseUpdateSchema = wmsWarehouseInsertSchema.partial();
