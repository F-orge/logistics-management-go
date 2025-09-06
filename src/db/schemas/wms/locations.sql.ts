// Drizzle ORM schema for wms_locations
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const wmsLocationEnum = wmsSchema.enum('location_type', [
  'zone',
  'aisle',
  'rack',
  'bin',
]);

export const locations = wmsSchema.table('locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  parentId: uuid('parent_id'), // FK to wms_locations.id (hierarchy)
  name: varchar('name', { length: 64 }).notNull(),
  type: wmsLocationEnum().notNull(), // zone, aisle, rack, bin
  capacity: integer('capacity'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign key: parent_id -> wms_locations.id
