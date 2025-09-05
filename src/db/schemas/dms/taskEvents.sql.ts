// Drizzle ORM schema for dms_task_events
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { dmsSchema } from './index';

export const taskEvents = dmsSchema.table('task_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  deliveryTaskId: uuid('delivery_task_id').notNull(), // FK to delivery_tasks
  status: varchar('status', { length: 32 }).notNull(),
  reason: text('reason'),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
});
