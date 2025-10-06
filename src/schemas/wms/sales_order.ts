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
    .nullable()
    .optional(),
  shippingAddress: z
    .string({ message: 'Shipping address must be a string' })
    .min(1, { error: 'Shipping address cannot be empty' })
    .max(255, { error: 'Shipping address must be at most 255 characters' })
    .nullable()
    .optional(),
  status: z
    .enum(WmsSalesOrderStatusEnum, { message: 'Invalid sales order status' })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type WmsSalesOrder = z.infer<typeof wmsSalesOrderSchema>;

export const wmsSalesOrderInsertSchema = wmsSalesOrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsSalesOrderUpdateSchema = wmsSalesOrderInsertSchema.partial();
