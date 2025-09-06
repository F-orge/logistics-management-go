import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { opportunities } from './opportunities.sql';

export const opportunitySchema = createSelectSchema(opportunities, {
  expectedCloseDate: z.coerce.date().nullable().optional(),
});

export const insertOpportunitySchema = opportunitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateOpportunitySchema = insertOpportunitySchema.partial();
