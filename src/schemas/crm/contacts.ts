import { z } from 'zod';

export const crmContactSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Name must be a string' })
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must be at most 255 characters' }),
  email: z
    .string({ message: 'Email must be a string' })
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' })
    .max(255, { message: 'Email must be at most 255 characters' }),
  companyId: z
    .uuid({ message: 'Invalid UUID format for company ID' })
    .optional(),
  jobTitle: z
    .string({ message: 'Job title must be a string' })
    .min(1, { message: 'Job title is required' })
    .max(127, { message: 'Job title must be at most 127 characters' })
    .optional(),
  ownerId: z
    .string({ message: 'Owner ID must be a string' })
    .min(1, { message: 'Owner ID is required' })
    .max(255, { message: 'Owner ID must be at most 255 characters' }),
  phoneNumber: z
    .e164({ message: 'Invalid phone number format' })
    .min(1, { message: 'Phone number is required' })
    .max(32, { message: 'Phone number must be at most 32 characters' })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid ISO datetime format for creation date' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid ISO datetime format for update date' })
    .optional(),
});

export type CrmContact = z.infer<typeof crmContactSchema>;

export const crmContactInsertSchema = crmContactSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmContactUpdateSchema = crmContactInsertSchema.partial();
