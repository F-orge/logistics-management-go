import { z } from 'zod';

export const InventoryBatchSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  batchNumber: z
    .string({ message: 'Batch number must be a string' })
    .min(1, { error: 'Batch number is required' })
    .max(64, { error: 'Batch number must be at most 64 characters' }),
  expirationDate: z
    .date({ message: 'Invalid date format for expiration date' })
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

export type WmsInventoryBatch = z.infer<typeof InventoryBatchSchema>;

export const InventoryBatchInsertSchema = InventoryBatchSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const InventoryBatchUpdateSchema =
  InventoryBatchInsertSchema.partial();
