// Drizzle ORM schema for tms_driver_schedules
import { date, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const driverSchedules = tmsSchema.table('driver_schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  driverId: uuid('driver_id').notNull(), // FK to drivers
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  reason: varchar('reason', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
