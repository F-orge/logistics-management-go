// Drizzle ORM schema for tms_drivers
import { uuid, varchar, date, timestamp } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const drivers = tmsSchema.table('drivers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(), // FK to users
  licenseNumber: varchar('license_number', { length: 64 }).notNull(),
  licenseExpiryDate: date('license_expiry_date').notNull(),
  status: varchar('status', { length: 32 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
