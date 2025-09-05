// Drizzle ORM schema for tms_shipment_leg_events
import { uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const shipmentLegEvents = tmsSchema.table('shipment_leg_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  shipmentLegId: uuid('shipment_leg_id').notNull(), // FK to shipment_legs
  statusMessage: varchar('status_message', { length: 128 }),
  location: varchar('location', { length: 128 }),
  eventTimestamp: timestamp('event_timestamp', {
    withTimezone: true,
  }).notNull(),
});
