import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { leads } from './leads.sql';

export const leadSchema = createSelectSchema(leads, {
  email: z.email().nullable().optional(),
});

export const insertLeadSchema = leadSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateLeadSchema = insertLeadSchema.partial();
