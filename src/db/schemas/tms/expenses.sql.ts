// Drizzle ORM schema for tms_expenses
import {
  decimal,
  integer,
  real,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const expenses = tmsSchema.table('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  tripId: uuid('trip_id').notNull(), // FK to trips
  driverId: uuid('driver_id').notNull(), // FK to drivers
  type: varchar('type', { length: 32 }).notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }),
  currency: varchar('currency', { length: 8 }),
  receiptUrl: varchar('receipt_url', { length: 256 }),
  fuelQuantity: real('fuel_quantity'),
  odometerReading: integer('odometer_reading'),
  status: varchar('status', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
