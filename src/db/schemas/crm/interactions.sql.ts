// Drizzle ORM schema for crm_interactions
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from '../better-auth.sql';
import { cases } from './cases.sql';
import { contacts } from './contacts.sql';
import { crmSchema } from './index';

export const interactionType = crmSchema.enum('interaction_type', [
  'call',
  'meeting',
  'text',
  'email',
]);

export const interactions = crmSchema.table('interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  contactId: uuid('contact_id').references(() => contacts.id), // FK to contacts
  userId: text('user_id').references(() => user.id), // FK to users
  caseId: uuid('case_id').references(() => cases.id), // FK to cases, nullable
  type: interactionType().notNull(),
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
