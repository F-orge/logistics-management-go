// Drizzle ORM schema for portal_roles
import { uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { portalSchema } from './index';

export const roles = portalSchema.table('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 32 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
