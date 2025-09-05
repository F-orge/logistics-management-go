// Drizzle ORM schema for tms_carrier_rates
import { decimal, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const carrierRates = tmsSchema.table('carrier_rates', {
  id: uuid('id').primaryKey().defaultRandom(),
  carrierId: uuid('carrier_id').notNull(), // FK to carriers
  serviceType: varchar('service_type', { length: 32 }).notNull(),
  origin: varchar('origin', { length: 128 }).notNull(),
  destination: varchar('destination', { length: 128 }).notNull(),
  rate: decimal('rate', { precision: 12, scale: 2 }),
  unit: varchar('unit', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
