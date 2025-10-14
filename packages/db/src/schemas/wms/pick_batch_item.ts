import { z } from 'zod';

export const PickBatchItemSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  pickBatchId: z.uuid({ message: 'Invalid UUID format for pick batch ID' }),
  salesOrderId: z.uuid({ message: 'Invalid UUID format for sales order ID' }),
  orderPriority: z.coerce
    .number({ message: 'Order priority must be a number' })
    .int({ message: 'Order priority must be an integer' })
    .min(0, { error: 'Order priority must be at least 0' })
    .max(1000, { error: 'Order priority must be at most 1000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  estimatedPickTime: z.coerce
    .number({ message: 'Estimated pick time must be a number' })
    .int({ message: 'Estimated pick time must be an integer' })
    .min(0, { error: 'Estimated pick time must be at least 0' })
    .max(10000, { error: 'Estimated pick time must be at most 10,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  actualPickTime: z.coerce
    .number({ message: 'Actual pick time must be a number' })
    .int({ message: 'Actual pick time must be an integer' })
    .min(0, { error: 'Actual pick time must be at least 0' })
    .max(10000, { error: 'Actual pick time must be at most 10,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type WmsPickBatchItem = z.infer<typeof PickBatchItemSchema>;

export const PickBatchItemInsertSchema = PickBatchItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PickBatchItemUpdateSchema =
  PickBatchItemInsertSchema.partial();
