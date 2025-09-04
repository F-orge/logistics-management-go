// Drizzle ORM schema for dms_delivery_routes
import { uuid, date, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { dmsSchema } from './index';

export const deliveryRoutes = dmsSchema.table('delivery_routes', {
  id: uuid('id').primaryKey().defaultRandom(),
  driverId: uuid('driver_id').notNull(), // FK to tms_drivers
  routeDate: date('route_date').notNull(),
  status: varchar('status', { length: 32 }).notNull(),
  optimizedRouteData: text('optimized_route_data'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
