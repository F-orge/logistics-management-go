// Drizzle ORM schema for crm_leads
import {
  integer,
  pgEnum,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { crmSchema } from './index';
import { user } from '../better-auth.sql';
import { campaigns } from './campaigns.sql';
import { contacts } from './contacts.sql';
import { companies } from './companies.sql';
import { opportunities } from './opportunities.sql';

export const leadStatus = crmSchema.enum('lead_status', [
  'new', // The lead is in the database but no action has been taken by sales.
  'attempting-to-contact', // Sales is actively making outreach efforts.
  'connected', // The sales representative has had a conversation with the lead, but the lead hasn't been fully qualified yet.
  'qualified', // The lead has met the specific criteria set by the company and is deemed a strong potential customer.
  'meeting', // A follow-up meeting or demonstration has been scheduled with the qualified lead.
  'open-deal', // The lead has moved past the initial sales steps and is now part of the ongoing sales pipeline.
  'unqualified', // The lead does not meet the company's criteria and will not become a customer.
  'customer', // The lead has expressed a lack of interest or isn't ready to buy at this time.
  'not-interested', // The deal was closed-won, and the lead is now a paying customer.
  'cancelled', // A previous customer who has stopped using the service or product.
]);

export const leads = crmSchema.table('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 128 }).notNull(),
  email: varchar('email', { length: 128 }),
  leadSource: varchar('lead_source', { length: 64 }),
  status: leadStatus().notNull().default('new'),
  leadScore: integer('lead_score'),
  ownerId: text('owner_id').references(() => user.id), // FK to users
  campaignId: uuid('campaign_id').references(() => campaigns.id), // FK to campaigns
  convertedAt: timestamp('converted_at', { withTimezone: true }),
  convertedContactId: uuid('converted_contact_id').references(
    () => contacts.id,
  ), // FK to contacts
  convertedCompanyId: uuid('converted_company_id').references(
    () => companies.id,
  ), // FK to companies
  convertedOpportunityId: uuid('converted_opportunity_id').references(
    () => opportunities.id,
  ), // FK to opportunities
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
