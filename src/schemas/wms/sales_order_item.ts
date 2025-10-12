import { z } from 'zod';

export const wmsSalesOrderItemSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  salesOrderId: z.uuid({ message: 'Invalid UUID format for sales order ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  quantityOrdered: z.coerce
    .number({ message: 'Quantity ordered must be a number' })
    .int({ message: 'Quantity ordered must be an integer' })
    .min(0, { error: 'Quantity ordered must be at least 0' })
    .max(1000000, { error: 'Quantity ordered must be at most 1,000,000' }),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsSalesOrderItem = z.infer<typeof wmsSalesOrderItemSchema>;

export const wmsSalesOrderItemInsertSchema = wmsSalesOrderItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsSalesOrderItemUpdateSchema =
  wmsSalesOrderItemInsertSchema.partial();
