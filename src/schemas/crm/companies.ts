import { z } from 'zod';

// Zod schema for crm.companies table

export const crmCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string().nullable(),
  annualRevenue: z.string().nullable(), // Numeric is string in Kysely
  city: z.string().nullable(),
  country: z.string().nullable(),
  industry: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  postalCode: z.string().nullable(),
  state: z.string().nullable(),
  street: z.string().nullable(),
  website: z.string().nullable(),
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
