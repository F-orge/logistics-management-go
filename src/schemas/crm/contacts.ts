import { z } from 'zod';

export const crmContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  companyId: z.string().nullable(),
  jobTitle: z.string().nullable(),
  ownerId: z.string(),
  phoneNumber: z.string().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmContact = z.infer<typeof crmContactSchema>;

export const crmContactInsertSchema = crmContactSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmContactUpdateSchema = crmContactInsertSchema.partial();
