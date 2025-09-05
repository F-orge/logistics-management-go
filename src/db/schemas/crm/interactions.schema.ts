import { createInsertSchema } from 'drizzle-zod';
import { interactions } from './interactions.sql';

export const insertInteractionSchema = createInsertSchema(interactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
