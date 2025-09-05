// Drizzle ORM schema for tms_geofences
import { uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const geofences = tmsSchema.table('geofences', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 64 }).notNull(),
  coordinates: text('coordinates'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
