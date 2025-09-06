import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { companies } from './companies.sql';

export const companySchema = createSelectSchema(companies, {
  phoneNumber: z.e164().nullable().optional(),
  website: z.url().nullable().optional(),
});

export const insertCompanySchema = companySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCompanySchema = insertCompanySchema.partial();
