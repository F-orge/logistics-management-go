import { z } from 'zod';
import { WmsSalesOrderStatusEnum } from '@/db/types';

export const wmsSalesOrderSchema = z.object({
  id: z.uuid(),
  clientId: z.uuid(),
  orderNumber: z
    .string()
    .min(1, { error: 'Order number is required' })
    .max(64, { error: 'Order number must be at most 64 characters' }),
  crmOpportunityId: z.uuid().nullable().optional(),
  shippingAddress: z.string().nullable().optional(),
  status: z.enum(WmsSalesOrderStatusEnum).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsSalesOrder = z.infer<typeof wmsSalesOrderSchema>;

export const wmsSalesOrderInsertSchema = wmsSalesOrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsSalesOrderUpdateSchema = wmsSalesOrderInsertSchema.partial();
