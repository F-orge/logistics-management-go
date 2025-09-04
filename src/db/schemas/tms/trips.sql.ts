// Drizzle ORM schema for tms_trips
import { uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const trips = tmsSchema.table('trips', {
  id: uuid('id').primaryKey().defaultRandom(),
  driverId: uuid('driver_id').notNull(), // FK to drivers
  vehicleId: uuid('vehicle_id').notNull(), // FK to vehicles
  status: varchar('status', { length: 32 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
