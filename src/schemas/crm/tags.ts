import { z } from 'zod';

export const crmTagSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Tag name is required' })
    .max(127, { error: 'Tag name must be at most 127 characters' }),
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
