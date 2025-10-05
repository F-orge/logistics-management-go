import { z } from 'zod';

export const wmsInventoryStockSchema = z.object({
  id: z.string(),
  productId: z.string(),
  locationId: z.string(),
  quantity: z.coerce.number(),
  status: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsInventoryStock = z.infer<typeof wmsInventoryStockSchema>;

export const wmsInventoryStockInsertSchema = wmsInventoryStockSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsInventoryStockUpdateSchema =
  wmsInventoryStockInsertSchema.partial();
