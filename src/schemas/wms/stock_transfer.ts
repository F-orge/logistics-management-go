import { z } from 'zod';

export const wmsStockTransferSchema = z.object({
  id: z.uuid(),
  fromLocationId: z.uuid(),
  toLocationId: z.uuid(),
  productId: z.uuid(),
  quantity: z.coerce.number(),
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
