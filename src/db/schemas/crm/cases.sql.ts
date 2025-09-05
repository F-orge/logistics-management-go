// Drizzle ORM schema for crm_cases
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const cases = crmSchema.table('cases', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseNumber: varchar('case_number', { length: 64 }),
  status: varchar('status', { length: 32 }),
  priority: varchar('priority', { length: 16 }),
  type: varchar('type', { length: 32 }),
  ownerId: uuid('owner_id'), // FK to users
  contactId: uuid('contact_id'), // FK to contacts
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
