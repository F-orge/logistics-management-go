// Drizzle ORM schema for portal_notifications
import { uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { portalSchema } from './index';

export const notifications = portalSchema.table('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(), // FK to users
  message: varchar('message', { length: 256 }).notNull(),
  linkUrl: varchar('link_url', { length: 256 }),
  isRead: boolean('is_read').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
