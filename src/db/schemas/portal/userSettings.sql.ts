// Drizzle ORM schema for portal_user_settings
import { uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { portalSchema } from './index';

export const userSettings = portalSchema.table('user_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(), // FK to users
  key: varchar('key', { length: 64 }).notNull(),
  value: text('value'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
