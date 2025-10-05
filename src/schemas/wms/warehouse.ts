import { z } from 'zod';

export const wmsWarehouseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  location: z.string(),
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
