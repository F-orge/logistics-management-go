import { z } from 'zod';

// Zod schema for crm.companies table

export const crmCompanySchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    name: z
      .string({ message: 'Company name must be a string' })
      .min(1, { message: 'Company name is required' })
      .max(255, { message: 'Company name must be at most 255 characters' }),
    ownerId: z
      .string({ message: 'Owner ID must be a string' })
      .max(255, { message: 'Owner ID must be at most 255 characters' })
      .optional(),
    annualRevenue: z.coerce
      .number({ message: 'Annual revenue must be a number' })
      .min(0, { message: 'Annual revenue must be at least 0' })
      .optional(),
    city: z
      .string({ message: 'City must be a string' })
      .min(1, { message: 'City is required' })
      .max(127, { message: 'City must be at most 127 characters' })
      .optional(),
    country: z
      .string({ message: 'Country must be a string' })
      .min(1, { message: 'Country is required' })
      .max(127, { message: 'Country must be at most 127 characters' })
      .optional(),
    industry: z
      .string({ message: 'Industry must be a string' })
      .min(1, { message: 'Industry is required' })
      .max(127, { message: 'Industry must be at most 127 characters' })
      .optional(),
    phoneNumber: z
      .e164({ message: 'Invalid phone number format' })
      .min(1, { message: 'Phone number is required' })
      .max(32, { message: 'Phone number must be at most 32 characters' })
      .optional(),
    postalCode: z
      .string({ message: 'Postal code must be a string' })
      .min(1, { message: 'Postal code is required' })
      .max(32, { message: 'Postal code must be at most 32 characters' })
      .optional(),
    state: z
      .string({ message: 'State must be a string' })
      .min(1, { message: 'State is required' })
      .max(127, { message: 'State must be at most 127 characters' })
      .optional(),
    street: z
      .string({ message: 'Street must be a string' })
      .min(1, { message: 'Street is required' })
      .max(255, { message: 'Street must be at most 255 characters' })
      .optional(),
    website: z
      .url({ message: 'Invalid URL format for website' })
      .min(1, { message: 'Website is required' })
      .max(255, { message: 'Website must be at most 255 characters' })
      .optional(),
    createdAt: z
      .date({
        message: 'Invalid ISO datetime format for creation date',
      })
      .optional(),
    updatedAt: z
      .date({
        message: 'Invalid ISO datetime format for update date',
      })
      .optional(),
  })
  .strict();

export type CrmCompany = z.infer<typeof crmCompanySchema>;

// Insert schema omits id, createdAt, updatedAt
export const crmCompanyInsertSchema = crmCompanySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema is a partial of insert schema
export const crmCompanyUpdateSchema = crmCompanyInsertSchema.partial();
