import {
  boolean,
  index,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { user } from '../better-auth';
import { entityFields, omitEntity } from '../helpers';
import { crmSchema } from './schema';

export const crmNotifications = crmSchema.table(
  'notifications',
  {
    ...entityFields,
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    message: text('message').notNull(),
    isRead: boolean('is_read').default(false),
    link: varchar('link', { length: 255 }),
  },
  (table) => [
    index('idx_crm_notifications_user_id').on(table.userId),
    index('idx_crm_notifications_is_read').on(table.isRead),
    index('idx_crm_notifications_created_at').on(table.createdAt),
  ],
);

// zod schemas

export const insertNotificationSchema =
  createInsertSchema(crmNotifications).omit(omitEntity);
export const updateNotificationSchema = insertNotificationSchema.partial();
