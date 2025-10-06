import { z } from 'zod';

export const wmsWarehouseSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Name must be a string' })
    .min(1, { error: 'Name is required' })
    .max(127, { error: 'Name must be at most 127 characters' }),
  address: z
    .string({ message: 'Address must be a string' })
    .min(1, { error: 'Address cannot be empty' })
    .max(255, { error: 'Address must be at most 255 characters' })
    .nullable()
    .optional(),
  city: z
    .string({ message: 'City must be a string' })
    .min(1, { error: 'City cannot be empty' })
    .max(127, { error: 'City must be at most 127 characters' })
    .nullable()
    .optional(),
  state: z
    .string({ message: 'State must be a string' })
    .min(1, { error: 'State cannot be empty' })
    .max(127, { error: 'State must be at most 127 characters' })
    .nullable()
    .optional(),
  postalCode: z
    .string({ message: 'Postal code must be a string' })
    .min(1, { error: 'Postal code cannot be empty' })
    .max(20, { error: 'Postal code must be at most 20 characters' })
    .nullable()
    .optional(),
  country: z
    .string({ message: 'Country must be a string' })
    .min(1, { error: 'Country cannot be empty' })
    .max(127, { error: 'Country must be at most 127 characters' })
    .nullable()
    .optional(),
  contactPerson: z
    .string({ message: 'Contact person must be a string' })
    .min(1, { error: 'Contact person cannot be empty' })
    .max(255, { error: 'Contact person must be at most 255 characters' })
    .nullable()
    .optional(),
  contactEmail: z
    .string({ message: 'Contact email must be a string' })
    .email({ message: 'Invalid email format' })
    .min(1, { error: 'Contact email cannot be empty' })
    .max(255, { error: 'Contact email must be at most 255 characters' })
    .nullable()
    .optional(),
  contactPhone: z
    .string({ message: 'Contact phone must be a string' })
    .min(1, { error: 'Contact phone cannot be empty' })
    .max(32, { error: 'Contact phone must be at most 32 characters' })
    .nullable()
    .optional(),
  timezone: z
    .string({ message: 'Timezone must be a string' })
    .min(1, { error: 'Timezone cannot be empty' })
    .max(64, { error: 'Timezone must be at most 64 characters' })
    .nullable()
    .optional(),
  isActive: z
    .boolean({ message: 'Is active must be a boolean' })
    .nullable()
    .optional(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type WmsWarehouse = z.infer<typeof wmsWarehouseSchema>;

export const wmsWarehouseInsertSchema = wmsWarehouseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsWarehouseUpdateSchema = wmsWarehouseInsertSchema.partial();
