// Drizzle ORM schema for wms_tasks
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const tasks = wmsSchema.table('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type', { length: 32 }).notNull(), // pick, putaway, replenishment, etc.
  status: varchar('status', { length: 32 }).notNull(), // pending, in_progress, completed
  assigned_to: uuid('assigned_to'), // FK to wms_team.id (optional)
  related_batch_id: uuid('related_batch_id'), // FK to wms_pick_batches.id (optional)
  source_location_id: uuid('source_location_id'), // FK to wms_locations.id
  destination_location_id: uuid('destination_location_id'), // FK to wms_locations.id
  product_id: varchar('product_id', { length: 36 }), // FK to ims_products.id
  quantity: integer('quantity'),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: assigned_to -> wms_team.id, related_batch_id -> wms_pick_batches.id, source_location_id/destination_location_id -> wms_locations.id, product_id -> ims_products.id
