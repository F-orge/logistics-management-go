// Drizzle ORM schema for portal_permissions
import { uuid, varchar, text } from 'drizzle-orm/pg-core';
import { portalSchema } from './index';

export const permissions = portalSchema.table('permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  action: varchar('action', { length: 32 }).notNull(),
  subject: varchar('subject', { length: 32 }).notNull(),
  description: text('description'),
});
