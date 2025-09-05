// Drizzle ORM schema for tms_carriers
import { uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const carriers = tmsSchema.table('carriers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 128 }).notNull(),
  contactDetails: varchar('contact_details', { length: 256 }),
  servicesOffered: text('services_offered'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
