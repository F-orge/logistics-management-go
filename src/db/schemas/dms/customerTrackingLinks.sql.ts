// Drizzle ORM schema for dms_customer_tracking_links
import { uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { dmsSchema } from './index';

export const customerTrackingLinks = dmsSchema.table(
  'customer_tracking_links',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    deliveryTaskId: uuid('delivery_task_id').notNull(), // FK to delivery_tasks
    trackingToken: varchar('tracking_token', { length: 64 }).notNull(),
    isActive: boolean('is_active').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
);
