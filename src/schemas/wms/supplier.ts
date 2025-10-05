import { z } from 'zod';

export const wmsSupplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  contactName: z.string().nullable(),
  contactEmail: z.string().nullable(),
  contactPhone: z.string().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsSupplier = z.infer<typeof wmsSupplierSchema>;

export const wmsSupplierInsertSchema = wmsSupplierSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsSupplierUpdateSchema = wmsSupplierInsertSchema.partial();
