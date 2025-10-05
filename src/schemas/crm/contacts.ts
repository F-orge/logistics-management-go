import { z } from 'zod';

export const crmContactSchema = z.object({
  id: z
    .string()
    .min(1, { error: 'ID is required' })
    .max(255, { error: 'ID must be at most 255 characters' }),
  name: z
    .string()
    .min(1, { error: 'Name is required' })
    .max(255, { error: 'Name must be at most 255 characters' }),
  email: z
    .email()
    .min(1, { error: 'Email is required' })
    .max(255, { error: 'Email must be at most 255 characters' }),
  companyId: z.uuid().nullable(),
  jobTitle: z
    .string()
    .min(1, { error: 'Job title is required' })
    .max(127, { error: 'Job title must be at most 127 characters' })
    .nullable(),
  ownerId: z
    .string()
    .min(1, { error: 'Owner ID is required' })
    .max(255, { error: 'Owner ID must be at most 255 characters' }),
  phoneNumber: z
    .e164()
    .min(1, { error: 'Phone number is required' })
    .max(32, { error: 'Phone number must be at most 32 characters' })
    .nullable(),
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
