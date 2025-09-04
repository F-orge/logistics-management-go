// Drizzle ORM schema for ims_suppliers
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { imsSchema } from './index';

export const suppliers = imsSchema.table('suppliers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  contact_person: varchar('contact_person', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone_number: varchar('phone_number', { length: 32 }),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
