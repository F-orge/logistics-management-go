import { z } from 'zod';

export const crmTagSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmTag = z.infer<typeof crmTagSchema>;

export const crmTagInsertSchema = crmTagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmTagUpdateSchema = crmTagInsertSchema.partial();
