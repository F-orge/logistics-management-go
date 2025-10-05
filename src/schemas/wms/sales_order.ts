import { z } from 'zod';
import { WmsSalesOrderStatusEnum } from '@/db/types';

export const wmsSalesOrderSchema = z.object({
  id: z.uuid(),
  referenceNumber: z
    .string()
    .min(1, { error: 'Reference number is required' })
    .max(64, { error: 'Reference number must be at most 64 characters' }),
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
