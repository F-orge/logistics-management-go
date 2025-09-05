// Drizzle ORM schema for tms_vehicles
import { uuid, varchar, real, timestamp } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const vehicles = tmsSchema.table('vehicles', {
  id: uuid('id').primaryKey().defaultRandom(),
  registrationNumber: varchar('registration_number', { length: 32 }).notNull(),
  model: varchar('model', { length: 64 }).notNull(),
  capacityVolume: real('capacity_volume'),
  capacityWeight: real('capacity_weight'),
  status: varchar('status', { length: 32 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
