import { z } from 'zod';

export const wmsStockTransferSchema = z.object({
  id: z.string(),
  fromLocationId: z.string(),
  toLocationId: z.string(),
  productId: z.string(),
  quantity: z.string(), // Numeric as string
  status: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsStockTransfer = z.infer<typeof wmsStockTransferSchema>;

export const wmsStockTransferInsertSchema = wmsStockTransferSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsStockTransferUpdateSchema =
  wmsStockTransferInsertSchema.partial();
