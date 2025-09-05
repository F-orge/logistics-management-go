import { createSelectSchema } from 'drizzle-zod';
import { companies } from './companies.sql';
import z from 'zod';

export const companySchema = createSelectSchema(companies, {
  phoneNumber: z.e164(),
  website: z.url(),
});

export const insertCompanySchema = companySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCompanySchema = insertCompanySchema.partial();
