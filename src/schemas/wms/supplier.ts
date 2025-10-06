import { z } from 'zod';

export const wmsSupplierSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Name is required' })
    .max(255, { error: 'Name must be at most 255 characters' }),
  contactPerson: z
    .string()
    .min(1, { error: 'Contact person is required' })
    .max(255, { error: 'Contact person must be at most 255 characters' })
    .nullable(),
  email: z
    .string()
    .min(1, { error: 'Email is required' })
    .max(255, { error: 'Email must be at most 255 characters' })
    .nullable(),
  phoneNumber: z
    .string()
    .min(1, { error: 'Phone number is required' })
    .max(32, { error: 'Phone number must be at most 32 characters' })
    .nullable(),
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
