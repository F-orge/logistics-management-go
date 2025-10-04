import { eq } from 'drizzle-orm';
import {
  boolean,
  index,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { selectSchema, serverAction } from '@/lib/server-utils';
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
