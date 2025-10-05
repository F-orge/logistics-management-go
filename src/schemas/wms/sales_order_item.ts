import { z } from 'zod';

export const wmsSalesOrderItemSchema = z.object({
  id: z.string(),
  salesOrderId: z.string(),
  productId: z.string(),
  quantity: z.string(), // Numeric as string
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsSalesOrderItem = z.infer<typeof wmsSalesOrderItemSchema>;

export const wmsSalesOrderItemInsertSchema = wmsSalesOrderItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsSalesOrderItemUpdateSchema =
  wmsSalesOrderItemInsertSchema.partial();
