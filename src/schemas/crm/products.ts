import { z } from 'zod';
import { CrmProductType } from '@/db/types';

export const crmProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.coerce.number(),
  sku: z.string().nullable(),
  type: z.enum(CrmProductType).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmProduct = z.infer<typeof crmProductSchema>;

export const crmProductInsertSchema = crmProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmProductUpdateSchema = crmProductInsertSchema.partial();
