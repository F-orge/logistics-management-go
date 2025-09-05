// Drizzle ORM schema for tms_gps_pings
import { real, timestamp, uuid } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const gpsPings = tmsSchema.table('gps_pings', {
  id: uuid('id').primaryKey().defaultRandom(),
  vehicleId: uuid('vehicle_id').notNull(), // FK to vehicles
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
});
