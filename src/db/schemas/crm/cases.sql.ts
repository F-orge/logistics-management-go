// Drizzle ORM schema for crm_cases
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from '../better-auth.sql';
import { contacts } from './contacts.sql';
import { crmSchema } from './index';

export const casePriority = crmSchema.enum('case_priority', [
  'high',
  'medium',
  'low',
]);

export const caseStatus = crmSchema.enum('case_status', [
  'active',
  'resolved',
  'cancelled',
]);

export const cases = crmSchema.table('cases', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseNumber: varchar('case_number', { length: 64 }),
  status: caseStatus().notNull().default('active'),
  priority: casePriority().notNull(),
  type: varchar('type', { length: 32 }),
  ownerId: text('owner_id').references(() => user.id), // FK to users
  contactId: uuid('contact_id').references(() => contacts.id), // FK to contacts
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
