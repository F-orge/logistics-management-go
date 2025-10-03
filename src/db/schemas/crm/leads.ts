import {
  index,
  integer,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { user } from '../better-auth';
import { entityFields, omitEntity } from '../helpers';
import { crmCampaigns } from './campaigns';
import { crmCompanies } from './companies';
import { crmContacts } from './contacts';
import { crmOpportunities } from './opportunities';
import { crmSchema } from './schema';
import { eq } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/server-utils';
import z from 'zod';

export const leadStatusEnum = crmSchema.enum('lead_status', [
  'new',
  'contacted',
  'qualified',
  'unqualified',
  'converted',
]);

export const leadSourceEnum = crmSchema.enum('lead_source', [
  'website',
  'referral',
  'social-media',
  'email-campaign',
  'cold-call',
  'event',
  'advertisement',
  'partner',
  'other',
]);

export const crmLeads = crmSchema.table(
  'leads',
  {
    ...entityFields,
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    leadSource: leadSourceEnum('lead_source'),
    status: leadStatusEnum('status').default('new'),
    leadScore: integer('lead_score'),
    ownerId: text('owner_id')
      .notNull()
      .references(() => user.id),
    campaignId: uuid('campaign_id').references(() => crmCampaigns.id),
    convertedAt: timestamp('converted_at', { withTimezone: true }),
    convertedContactId: uuid('converted_contact_id').references(
      () => crmContacts.id,
    ),
    convertedCompanyId: uuid('converted_company_id').references(
      () => crmCompanies.id,
    ),
    convertedOpportunityId: uuid('converted_opportunity_id').references(
      () => crmOpportunities.id,
    ),
  },
  (table) => [
    index('idx_crm_leads_status').on(table.status),
    index('idx_crm_leads_lead_source').on(table.leadSource),
    index('idx_crm_leads_owner_id').on(table.ownerId),
    index('idx_crm_leads_campaign_id').on(table.campaignId),
    index('idx_crm_leads_email').on(table.email),
    index('idx_crm_leads_converted_at').on(table.convertedAt),
  ],
);

// zod schemas
export const insertLeadSchema = createInsertSchema(crmLeads).omit(omitEntity);
export const updateLeadSchema = insertLeadSchema.partial();

// server actions
export const createLeadAction = serverAction({ method: 'POST' })
  .inputValidator(insertLeadSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmLeads)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateLeadAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateLeadSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmLeads)
        .set(data.payload)
        .where(eq(crmLeads.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectLeadAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmLeads).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmLeads)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
