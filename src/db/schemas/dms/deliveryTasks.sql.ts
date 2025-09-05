// Drizzle ORM schema for dms_delivery_tasks
import { uuid, integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { dmsSchema } from './index';

export const deliveryTasks = dmsSchema.table('delivery_tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  packageId: uuid('package_id').notNull(), // FK to wms_packages
  deliveryRouteId: uuid('delivery_route_id').notNull(), // FK to delivery_routes
  routeSequence: integer('route_sequence').notNull(),
  estimatedArrivalTime: timestamp('estimated_arrival_time', {
    withTimezone: true,
  }),
  status: varchar('status', { length: 32 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
