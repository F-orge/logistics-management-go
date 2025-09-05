// Drizzle ORM schema for tms_trip_stops
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const tripStops = tmsSchema.table('trip_stops', {
  id: uuid('id').primaryKey().defaultRandom(),
  tripId: uuid('trip_id').notNull(), // FK to trips
  shipmentId: uuid('shipment_id').notNull(), // FK to ims_outbound_shipments
  sequence: integer('sequence').notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  status: varchar('status', { length: 32 }).notNull(),
  estimatedArrivalTime: timestamp('estimated_arrival_time', {
    withTimezone: true,
  }),
  actualArrivalTime: timestamp('actual_arrival_time', { withTimezone: true }),
  estimatedDepartureTime: timestamp('estimated_departure_time', {
    withTimezone: true,
  }),
  actualDepartureTime: timestamp('actual_departure_time', {
    withTimezone: true,
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
