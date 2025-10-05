import { z } from 'zod';

export const tmsCarrierSchema = z.object({
  id: z.string(),
  name: z.string(),
  contactName: z.string().nullable(),
  contactEmail: z.string().nullable(),
  contactPhone: z.string().nullable(),
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
