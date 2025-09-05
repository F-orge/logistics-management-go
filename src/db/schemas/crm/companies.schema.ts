import { createInsertSchema } from 'drizzle-zod';
import { companies } from './companies.sql';
import z from 'zod';

export const insertCompanySchema = createInsertSchema(companies, {
  phoneNumber: z.e164(),
  website: z.url(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCompanySchema = insertCompanySchema.partial();
