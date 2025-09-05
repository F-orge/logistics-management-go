// Drizzle ORM schema for crm_companies
import { decimal, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const companies = crmSchema.table('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  street: varchar('street', { length: 128 }),
  city: varchar('city', { length: 64 }),
  state: varchar('state', { length: 64 }),
  postalCode: varchar('postal_code', { length: 32 }),
  country: varchar('country', { length: 64 }),
  phoneNumber: varchar('phone_number', { length: 32 }),
  industry: varchar('industry', { length: 64 }),
  website: varchar('website', { length: 128 }),
  annualRevenue: decimal('annual_revenue', { precision: 16, scale: 2 }),
  ownerId: uuid('owner_id'), // FK to users
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
