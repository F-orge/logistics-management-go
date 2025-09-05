// Drizzle ORM schema for tms_vehicle_maintenance
import {
  uuid,
  date,
  varchar,
  decimal,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const vehicleMaintenance = tmsSchema.table('vehicle_maintenance', {
  id: uuid('id').primaryKey().defaultRandom(),
  vehicleId: uuid('vehicle_id').notNull(), // FK to vehicles
  serviceDate: date('service_date').notNull(),
  serviceType: varchar('service_type', { length: 32 }).notNull(),
  cost: decimal('cost', { precision: 12, scale: 2 }),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
