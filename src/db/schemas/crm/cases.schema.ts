import { createSelectSchema } from 'drizzle-zod';
import { cases } from './cases.sql';

export const caseSchema = createSelectSchema(cases);

export const insertCaseSchema = caseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCaseSchema = insertCaseSchema.partial();
