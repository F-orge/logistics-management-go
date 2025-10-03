import {
  date,
  index,
  numeric,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { user } from '../better-auth';
import { entityFields } from '../helpers';
import { crmCampaigns } from './campaigns';
import { crmCompanies } from './companies';
import { crmContacts } from './contacts';
import { crmSchema } from './schema';

export const opportunityStageEnum = crmSchema.enum('opportunity_stage', [
  'prospecting',
  'qualification',
  'need-analysis',
  'demo',
  'proposal',
  'negotiation',
  'closed-won',
  'closed-lost',
]);

export const opportunitySourceEnum = crmSchema.enum('opportunity_source', [
  'website',
  'referral',
  'social-media',
  'email-campaign',
  'cold-call',
  'event',
  'advertisement',
  'partner',
  'existing-customer',
  'other',
]);

export const crmOpportunities = crmSchema.table(
  'opportunities',
  {
    ...entityFields,
    name: varchar('name', { length: 255 }).notNull(),
    stage: opportunityStageEnum('stage'),
    dealValue: numeric('deal_value', { precision: 15, scale: 2 }),
    probability: real('probability'),
    expectedCloseDate: date('expected_close_date'),
    lostReason: text('lost_reason'),
    source: opportunitySourceEnum('source'),
    ownerId: text('owner_id')
      .notNull()
      .references(() => user.id),
    contactId: uuid('contact_id').references(() => crmContacts.id),
    companyId: uuid('company_id').references(() => crmCompanies.id),
    campaignId: uuid('campaign_id').references(() => crmCampaigns.id),
  },
  (table) => [
    index('idx_crm_opportunities_stage').on(table.stage),
    index('idx_crm_opportunities_owner_id').on(table.ownerId),
    index('idx_crm_opportunities_company_id').on(table.companyId),
    index('idx_crm_opportunities_contact_id').on(table.contactId),
    index('idx_crm_opportunities_campaign_id').on(table.campaignId),
    index('idx_crm_opportunities_expected_close_date').on(
      table.expectedCloseDate,
    ),
    index('idx_crm_opportunities_source').on(table.source),
  ],
);
