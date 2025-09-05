import { createInsertSchema } from 'drizzle-zod';
import { cases } from './cases.sql';

export const insertCaseSchema = createInsertSchema(cases, {}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCaseSchema = insertCaseSchema.partial();
