// Drizzle ORM schema for dms_proof_of_deliveries
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { dmsSchema } from './index';

export const proofOfDeliveries = dmsSchema.table('proof_of_deliveries', {
  id: uuid('id').primaryKey().defaultRandom(),
  deliveryTaskId: uuid('delivery_task_id').notNull(), // FK to delivery_tasks
  type: varchar('type', { length: 32 }).notNull(),
  filePath: varchar('file_path', { length: 256 }),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
});
