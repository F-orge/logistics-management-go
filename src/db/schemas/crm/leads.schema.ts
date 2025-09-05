import { createInsertSchema } from 'drizzle-zod';
import { leads } from './leads.sql';
import z from 'zod';

export const insertLeadSchema = createInsertSchema(leads, {
  email: z.email(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateLeadSchema = insertLeadSchema.partial();
