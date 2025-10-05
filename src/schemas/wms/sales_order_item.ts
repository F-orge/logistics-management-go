import { z } from 'zod';

export const wmsSalesOrderItemSchema = z.object({
  id: z.uuid(),
  salesOrderId: z
    .string()
    .min(1, { error: 'Sales order ID is required' })
    .max(255, { error: 'Sales order ID must be at most 255 characters' }),
  productId: z
    .string()
    .min(1, { error: 'Product ID is required' })
    .max(255, { error: 'Product ID must be at most 255 characters' }),
  quantity: z.coerce
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
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
