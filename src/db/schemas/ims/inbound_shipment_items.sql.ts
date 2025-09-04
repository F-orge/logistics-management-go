// Drizzle ORM schema for ims_inbound_shipment_items
import { integer, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { imsSchema } from './index';

export const inboundShipmentItems = imsSchema.table('inbound_shipment_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  inbound_shipment_id: uuid('inbound_shipment_id').notNull(), // FK to ims_inbound_shipments
  product_id: uuid('product_id').notNull(), // FK to ims_products
  expected_quantity: integer('expected_quantity').notNull(),
  received_quantity: integer('received_quantity').notNull(),
  discrepancy_notes: text('discrepancy_notes'),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: inbound_shipment_id -> ims_inbound_shipments.id, product_id -> ims_products.id
