import { z } from 'zod';

export const wmsSalesOrderItemSchema = z.object({
  id: z.uuid(),
  salesOrderId: z.uuid(),
  productId: z.uuid(),
  quantityOrdered: z.coerce
    .number()
    .min(0, { error: 'Quantity ordered must be at least 0' })
    .max(1000000, { error: 'Quantity ordered must be at most 1,000,000' }),
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
