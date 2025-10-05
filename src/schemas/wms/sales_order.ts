import { z } from 'zod';

export const wmsSalesOrderSchema = z.object({
  id: z.uuid(),
  referenceNumber: z.string(),
  status: z.string(),
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
