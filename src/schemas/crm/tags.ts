import { z } from 'zod';

export const crmTagSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Tag name must be a string' })
    .min(1, { message: 'Tag name is required' })
    .max(127, { message: 'Tag name must be at most 127 characters' }),
  createdAt: z.iso
    .datetime({ message: 'Invalid ISO datetime format for creation date' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid ISO datetime format for update date' })
    .nullable(),
});

export type CrmTag = z.infer<typeof crmTagSchema>;

export const crmTagInsertSchema = crmTagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmTagUpdateSchema = crmTagInsertSchema.partial();
