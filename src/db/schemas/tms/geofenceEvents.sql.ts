// Drizzle ORM schema for tms_geofence_events
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const geofenceEvents = tmsSchema.table('geofence_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  vehicleId: uuid('vehicle_id').notNull(), // FK to vehicles
  geofenceId: uuid('geofence_id').notNull(), // FK to geofences
  eventType: varchar('event_type', { length: 16 }).notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
});
