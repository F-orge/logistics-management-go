// Drizzle ORM schema for crm_interactions
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const interactions = crmSchema.table('interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  contactId: uuid('contact_id'), // FK to contacts
  userId: uuid('user_id'), // FK to users
  caseId: uuid('case_id'), // FK to cases, nullable
  type: varchar('type', { length: 32 }),
  outcome: varchar('outcome', { length: 128 }),
  notes: text('notes'),
  interactionDate: timestamp('interaction_date', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
