import { createSelectSchema } from 'drizzle-zod';
import { opportunities } from './opportunities.sql';
import z from 'zod';

export const opportunitySchema = createSelectSchema(opportunities, {
  expectedCloseDate: z.coerce.date().nullable().optional(),
});

export const insertOpportunitySchema = opportunitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateOpportunitySchema = insertOpportunitySchema.partial();
