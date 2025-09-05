// Drizzle ORM schema for dms_driver_locations
import { real, timestamp, uuid } from 'drizzle-orm/pg-core';
import { dmsSchema } from './index';

export const driverLocations = dmsSchema.table('driver_locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  driverId: uuid('driver_id').notNull(), // FK to tms_drivers
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
});
