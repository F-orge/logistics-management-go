// Drizzle ORM schema for crm_contacts
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const contacts = crmSchema.table('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 128 }).notNull(),
  email: varchar('email', { length: 128 }),
  phoneNumber: varchar('phone_number', { length: 32 }),
  jobTitle: varchar('job_title', { length: 64 }),
  companyId: uuid('company_id'), // FK to companies
  ownerId: uuid('owner_id'), // FK to users
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
