import { z } from 'zod';
import { WmsSalesOrderStatusEnum } from '@/db/types';

export const wmsSalesOrderSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  clientId: z.uuid({ message: 'Invalid UUID format for client ID' }),
  orderNumber: z
    .string({ message: 'Order number must be a string' })
    .min(1, { error: 'Order number is required' })
    .max(64, { error: 'Order number must be at most 64 characters' }),
  crmOpportunityId: z
    .uuid({ message: 'Invalid UUID format for CRM opportunity ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  shippingAddress: z
    .string({ message: 'Shipping address must be a string' })
    .min(1, { error: 'Shipping address cannot be empty' })
    .max(255, { error: 'Shipping address must be at most 255 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  status: z
    .enum(WmsSalesOrderStatusEnum, { message: 'Invalid sales order status' })
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

export type WmsSalesOrder = z.infer<typeof wmsSalesOrderSchema>;

export const wmsSalesOrderInsertSchema = wmsSalesOrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsSalesOrderUpdateSchema = wmsSalesOrderInsertSchema.partial();
