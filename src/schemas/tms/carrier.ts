import { z } from 'zod';

export const tmsCarrierSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Carrier name must be a string' })
    .min(1, { error: 'Carrier name is required' })
    .max(255, { error: 'Carrier name must be at most 255 characters' }),
  contactName: z
    .string({ message: 'Contact name must be a string' })
    .min(1, { error: 'Contact name is required' })
    .max(255, { error: 'Contact name must be at most 255 characters' })
    .nullable(),
  contactEmail: z
    .string({ message: 'Contact email must be a string' })
    .email({ message: 'Invalid email format' })
    .min(1, { error: 'Contact email is required' })
    .max(255, { error: 'Contact email must be at most 255 characters' })
    .nullable(),
  contactPhone: z
    .string({ message: 'Contact phone must be a string' })
    .min(1, { error: 'Contact phone is required' })
    .max(32, { error: 'Contact phone must be at most 32 characters' })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type TmsCarrier = z.infer<typeof tmsCarrierSchema>;

export const tmsCarrierInsertSchema = tmsCarrierSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsCarrierUpdateSchema = tmsCarrierInsertSchema.partial();
