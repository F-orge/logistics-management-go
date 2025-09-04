// Drizzle ORM schema for tms_shipment_legs
import { uuid, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const shipmentLegs = tmsSchema.table('shipment_legs', {
  id: uuid('id').primaryKey().defaultRandom(),
  shipmentId: uuid('shipment_id').notNull(), // FK to ims_outbound_shipments
  legSequence: integer('leg_sequence').notNull(),
  startLocation: varchar('start_location', { length: 128 }).notNull(),
  endLocation: varchar('end_location', { length: 128 }).notNull(),
  carrierId: uuid('carrier_id'), // FK to carriers (nullable)
  internalTripId: uuid('internal_trip_id'), // FK to trips (nullable)
  status: varchar('status', { length: 32 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
