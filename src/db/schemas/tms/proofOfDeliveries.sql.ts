// Drizzle ORM schema for tms_proof_of_deliveries
import { real, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const proofOfDeliveries = tmsSchema.table('proof_of_deliveries', {
  id: uuid('id').primaryKey().defaultRandom(),
  tripStopId: uuid('trip_stop_id').notNull(), // FK to trip_stops
  type: varchar('type', { length: 32 }).notNull(),
  filePath: varchar('file_path', { length: 256 }),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
  latitude: real('latitude'),
  longitude: real('longitude'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
