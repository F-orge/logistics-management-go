import { createSelectSchema } from 'drizzle-zod';
import { leads } from './leads.sql';
import z from 'zod';

export const leadSchema = createSelectSchema(leads, {
  email: z.email(),
});

export const insertLeadSchema = leadSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateLeadSchema = insertLeadSchema.partial();
