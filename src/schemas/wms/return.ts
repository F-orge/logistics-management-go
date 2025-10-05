import { z } from 'zod';

export const wmsReturnSchema = z.object({
  id: z.uuid(),
  referenceNumber: z.string(),
  status: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsReturn = z.infer<typeof wmsReturnSchema>;

export const wmsReturnInsertSchema = wmsReturnSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsReturnUpdateSchema = wmsReturnInsertSchema.partial();
