// Drizzle ORM schema for wms_locations
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const locations = wmsSchema.table('locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  parent_id: uuid('parent_id'), // FK to wms_locations.id (hierarchy)
  name: varchar('name', { length: 64 }).notNull(),
  type: varchar('type', { length: 32 }).notNull(), // zone, aisle, rack, bin
  capacity: integer('capacity'),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign key: parent_id -> wms_locations.id
