// Drizzle ORM schema for crm_leads
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const leads = crmSchema.table('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 128 }).notNull(),
  email: varchar('email', { length: 128 }),
  leadSource: varchar('lead_source', { length: 64 }),
  status: varchar('status', { length: 32 }),
  leadScore: integer('lead_score'),
  ownerId: uuid('owner_id'), // FK to users
  campaignId: uuid('campaign_id'), // FK to campaigns
  convertedAt: timestamp('converted_at', { withTimezone: true }),
  convertedContactId: uuid('converted_contact_id'), // FK to contacts
  convertedCompanyId: uuid('converted_company_id'), // FK to companies
  convertedOpportunityId: uuid('converted_opportunity_id'), // FK to opportunities
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
