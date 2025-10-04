import { eq } from 'drizzle-orm';
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
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { selectSchema, serverAction } from '@/lib/server-utils';
import { user } from '../better-auth';
import { entityFields, omitEntity } from '../helpers';
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

// zod schemas

export const insertOpportunitySchema =
  createInsertSchema(crmOpportunities).omit(omitEntity);
export const updateOpportunitySchema = insertOpportunitySchema.partial();

// server actions
export const createOpportunityAction = serverAction({ method: 'POST' })
  .inputValidator(insertOpportunitySchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmOpportunities)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateOpportunityAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateOpportunitySchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmOpportunities)
        .set(data.payload)
        .where(eq(crmOpportunities.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectOpportunityAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmOpportunities).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmOpportunities)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
