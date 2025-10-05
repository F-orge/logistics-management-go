import { z } from 'zod';

// Zod schema for crm.companies table

export const crmCompanySchema = z.object({
  id: z
    .string()
    .min(1, { error: 'ID is required' })
    .max(255, { error: 'ID must be at most 255 characters' }),
  name: z
    .string()
    .min(1, { error: 'Company name is required' })
    .max(255, { error: 'Company name must be at most 255 characters' }),
  ownerId: z
    .string()
    .min(1, { error: 'Owner ID is required' })
    .max(255, { error: 'Owner ID must be at most 255 characters' })
    .nullable(),
  annualRevenue: z
    .string()
    .min(1, { error: 'Annual revenue is required' })
    .max(32, { error: 'Annual revenue must be at most 32 characters' })
    .nullable(), // Numeric is string in Kysely
  city: z
    .string()
    .min(1, { error: 'City is required' })
    .max(127, { error: 'City must be at most 127 characters' })
    .nullable(),
  country: z
    .string()
    .min(1, { error: 'Country is required' })
    .max(127, { error: 'Country must be at most 127 characters' })
    .nullable(),
  industry: z
    .string()
    .min(1, { error: 'Industry is required' })
    .max(127, { error: 'Industry must be at most 127 characters' })
    .nullable(),
  phoneNumber: z
    .e164()
    .min(1, { error: 'Phone number is required' })
    .max(32, { error: 'Phone number must be at most 32 characters' })
    .nullable(),
  postalCode: z
    .string()
    .min(1, { error: 'Postal code is required' })
    .max(32, { error: 'Postal code must be at most 32 characters' })
    .nullable(),
  state: z
    .string()
    .min(1, { error: 'State is required' })
    .max(127, { error: 'State must be at most 127 characters' })
    .nullable(),
  street: z
    .string()
    .min(1, { error: 'Street is required' })
    .max(255, { error: 'Street must be at most 255 characters' })
    .nullable(),
  website: z
    .string()
    .min(1, { error: 'Website is required' })
    .max(255, { error: 'Website must be at most 255 characters' })
    .nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmCompany = z.infer<typeof crmCompanySchema>;

// Insert schema omits id, createdAt, updatedAt
export const crmCompanyInsertSchema = crmCompanySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema is a partial of insert schema
export const crmCompanyUpdateSchema = crmCompanyInsertSchema.partial();
