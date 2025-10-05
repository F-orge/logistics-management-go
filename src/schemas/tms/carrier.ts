import { z } from 'zod';

export const tmsCarrierSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Carrier name is required' })
    .max(255, { error: 'Carrier name must be at most 255 characters' }),
  contactName: z
    .string()
    .min(1, { error: 'Contact name is required' })
    .max(255, { error: 'Contact name must be at most 255 characters' })
    .nullable(),
  contactEmail: z
    .string()
    .min(1, { error: 'Contact email is required' })
    .max(255, { error: 'Contact email must be at most 255 characters' })
    .nullable(),
  contactPhone: z
    .string()
    .min(1, { error: 'Contact phone is required' })
    .max(32, { error: 'Contact phone must be at most 32 characters' })
    .nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsCarrier = z.infer<typeof tmsCarrierSchema>;

export const tmsCarrierInsertSchema = tmsCarrierSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsCarrierUpdateSchema = tmsCarrierInsertSchema.partial();
