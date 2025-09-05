// Drizzle ORM schema for wms_task_history
import { integer, timestamp, uuid } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const taskHistory = wmsSchema.table('task_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  task_id: uuid('task_id').notNull(), // FK to wms_tasks.id
  operator_id: uuid('operator_id'), // FK to wms_team.id (optional)
  completed_at: timestamp('completed_at', { withTimezone: true }).notNull(),
  time_taken_seconds: integer('time_taken_seconds'),
  accuracy: integer('accuracy'), // percent
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: task_id -> wms_tasks.id, operator_id -> wms_team.id
