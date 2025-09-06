import { createSelectSchema } from 'drizzle-zod';
import { interactions } from './interactions.sql';

export const interactionSchema = createSelectSchema(interactions);

export const insertInteractionSchema = interactionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
