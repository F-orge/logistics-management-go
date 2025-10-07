import { z } from 'zod';
import { WmsReturnItemConditionEnum } from '@/db/types';

export const wmsReturnItemSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  returnId: z.uuid({ message: 'Invalid UUID format for return ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  quantityExpected: z.coerce
    .number({ message: 'Quantity expected must be a number' })
    .int({ message: 'Quantity expected must be an integer' })
    .min(0, { error: 'Quantity expected must be at least 0' })
    .max(1000000, { error: 'Quantity expected must be at most 1,000,000' }),
  quantityReceived: z.coerce
    .number({ message: 'Quantity received must be a number' })
    .int({ message: 'Quantity received must be an integer' })
    .min(0, { error: 'Quantity received must be at least 0' })
    .max(1000000, { error: 'Quantity received must be at most 1,000,000' })
    .optional()
    .optional(),
  quantityVariance: z
    .number({ message: 'Quantity variance must be a number' })
    .int({ message: 'Quantity variance must be an integer' })
    .min(-1000000, { error: 'Quantity variance must be at least -1,000,000' })
    .max(1000000, { error: 'Quantity variance must be at most 1,000,000' })
    .optional()
    .optional(),
  condition: z
    .enum(WmsReturnItemConditionEnum, {
      message: 'Invalid return item condition',
    })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsReturnItem = z.infer<typeof wmsReturnItemSchema>;

export const wmsReturnItemInsertSchema = wmsReturnItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsReturnItemUpdateSchema = wmsReturnItemInsertSchema.partial();
