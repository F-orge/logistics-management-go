// Drizzle ORM schema for wms_bin_thresholds
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const binThresholds = wmsSchema.table('bin_thresholds', {
  id: uuid('id').primaryKey().defaultRandom(),
  locationId: uuid('location_id').notNull(), // FK to wms_locations.id
  productId: varchar('product_id', { length: 36 }).notNull(), // FK to ims_products.id
  threshold: integer('threshold').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: location_id -> wms_locations.id, product_id -> ims_products.id
