import { z } from 'zod';

export const wmsWarehouseSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Name is required' })
    .max(127, { error: 'Name must be at most 127 characters' }),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  contactPerson: z.string().nullable().optional(),
  contactEmail: z.string().nullable().optional(),
  contactPhone: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  isActive: z.boolean().nullable().optional(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsWarehouse = z.infer<typeof wmsWarehouseSchema>;

export const wmsWarehouseInsertSchema = wmsWarehouseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsWarehouseUpdateSchema = wmsWarehouseInsertSchema.partial();
