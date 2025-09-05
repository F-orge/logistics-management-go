// Drizzle ORM schema for crm_notifications
import { boolean, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const notifications = crmSchema.table('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'), // FK to users
  message: varchar('message', { length: 256 }),
  isRead: boolean('is_read'),
  link: varchar('link', { length: 256 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
