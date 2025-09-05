// Drizzle ORM schema for ims_outbound_shipment_items
import { integer, timestamp, uuid } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const outboundShipmentItems = imsSchema.table(
  'outbound_shipment_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    outbound_shipment_id: uuid('outbound_shipment_id').notNull(), // FK to ims_outbound_shipments
    sales_order_item_id: uuid('sales_order_item_id').notNull(), // FK to ims_sales_order_items
    product_id: uuid('product_id').notNull(), // FK to ims_products
    batch_id: uuid('batch_id'), // FK to ims_inventory_batches (nullable)
    quantity_shipped: integer('quantity_shipped').notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
);
// Foreign keys: outbound_shipment_id -> ims_outbound_shipments.id, sales_order_item_id -> ims_sales_order_items.id, product_id -> ims_products.id, batch_id -> ims_inventory_batches.id
