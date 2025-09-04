// Drizzle ORM schema for tms_routes
import { uuid, text, real, timestamp } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const routes = tmsSchema.table('routes', {
  id: uuid('id').primaryKey().defaultRandom(),
  tripId: uuid('trip_id').notNull(), // FK to trips
  optimizedRouteData: text('optimized_route_data'),
  totalDistance: real('total_distance'),
  totalDuration: real('total_duration'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
