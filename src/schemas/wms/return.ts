import { z } from 'zod';
import { WmsReturnStatusEnum } from '@/db/types';

export const wmsReturnSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  clientId: z.uuid({ message: 'Invalid UUID format for client ID' }),
  returnNumber: z
    .string({ message: 'Return number must be a string' })
    .min(1, { error: 'Return number is required' })
    .max(64, { error: 'Return number must be at most 64 characters' }),
  salesOrderId: z
    .uuid({ message: 'Invalid UUID format for sales order ID' })
    .nullable()
    .optional(),
  status: z
    .enum(WmsReturnStatusEnum, { message: 'Invalid return status' })
    .nullable(),
  reason: z
    .string({ message: 'Reason must be a string' })
    .min(1, { error: 'Reason cannot be empty' })
    .max(1024, { error: 'Reason must be at most 1024 characters' })
    .nullable()
    .optional(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type WmsReturn = z.infer<typeof wmsReturnSchema>;

export const wmsReturnInsertSchema = wmsReturnSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsReturnUpdateSchema = wmsReturnInsertSchema.partial();
