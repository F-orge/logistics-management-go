// Drizzle ORM schema for crm_opportunities
import {
  date,
  decimal,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { user } from '../better-auth.sql';
import { campaigns } from './campaigns.sql';
import { companies } from './companies.sql';
import { contacts } from './contacts.sql';
import { crmSchema } from './index';

export const opportunities = crmSchema.table('opportunities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 128 }).notNull(),
  stage: varchar('stage', { length: 32 }),
  dealValue: decimal('deal_value', { precision: 16, scale: 2 }),
  probability: real('probability'),
  expectedCloseDate: date('expected_close_date'),
  lostReason: text('lost_reason'),
  source: varchar('source', { length: 64 }),
  ownerId: text('owner_id').references(() => user.id), // FK to users
  contactId: uuid('contact_id').references(() => contacts.id), // FK to contacts
  companyId: uuid('company_id').references(() => companies.id), // FK to companies
  campaignId: uuid('campaign_id').references(() => campaigns.id), // FK to campaigns
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
