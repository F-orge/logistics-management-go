import { z } from 'zod';
import { WmsInventoryStockStatusEnum } from '@/db/types';

export const wmsInventoryStockSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  locationId: z.uuid({ message: 'Invalid UUID format for location ID' }),
  quantity: z
    .number({ message: 'Quantity must be a number' })
    .int({ message: 'Quantity must be an integer' })
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  reservedQuantity: z
    .number({ message: 'Reserved quantity must be a number' })
    .int({ message: 'Reserved quantity must be an integer' })
    .min(0, { error: 'Reserved quantity must be at least 0' })
    .max(1000000, { error: 'Reserved quantity must be at most 1,000,000' }),
  availableQuantity: z
    .number({ message: 'Available quantity must be a number' })
    .int({ message: 'Available quantity must be an integer' })
    .min(0, { error: 'Available quantity must be at least 0' })
    .max(1000000, { error: 'Available quantity must be at most 1,000,000' })
    .nullable()
    .optional(),
  batchId: z
    .uuid({ message: 'Invalid UUID format for batch ID' })
    .nullable()
    .optional(),
  status: z
    .enum(WmsInventoryStockStatusEnum, {
      message: 'Invalid inventory stock status',
    })
    .nullable(),
  lastCountedAt: z.iso
    .datetime({ message: 'Invalid date format for last counted at' })
    .nullable()
    .optional(),
  lastMovementAt: z.iso
    .datetime({ message: 'Invalid date format for last movement at' })
    .nullable()
    .optional(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type WmsInventoryStock = z.infer<typeof wmsInventoryStockSchema>;

export const wmsInventoryStockInsertSchema = wmsInventoryStockSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsInventoryStockUpdateSchema =
  wmsInventoryStockInsertSchema.partial();
