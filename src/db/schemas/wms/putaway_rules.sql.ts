// Drizzle ORM schema for wms_putaway_rules
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const putawayRules = wmsSchema.table('putaway_rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  product_id: varchar('product_id', { length: 36 }).notNull(), // FK to ims_products.id
  preferred_location_id: uuid('preferred_location_id'), // FK to wms_locations.id
  rule_type: varchar('rule_type', { length: 32 }).notNull(), // e.g., zone, bin type
  value: varchar('value', { length: 64 }), // e.g., zone name, bin type
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: product_id -> ims_products.id, preferred_location_id -> wms_locations.id
