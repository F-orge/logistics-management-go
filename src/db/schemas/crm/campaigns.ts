import { date, index, numeric, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { entityFields, omitEntity } from '../helpers';
import { crmSchema } from './schema';
import { eq } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/utils';
import z from 'zod';

export const crmCampaigns = crmSchema.table(
  'campaigns',
  {
    ...entityFields,
    name: varchar('name', { length: 255 }).notNull(),
    budget: numeric('budget', { precision: 15, scale: 2 }),
    startDate: date('start_date'),
    endDate: date('end_date'),
  },
  (table) => [
    index('idx_crm_campaigns_start_date').on(table.startDate),
    index('idx_crm_campaigns_end_date').on(table.endDate),
    index('idx_crm_campaigns_name').on(table.name),
  ],
);

// zod schemas

export const insertCampaignSchema =
  createInsertSchema(crmCampaigns).omit(omitEntity);
export const updateCampaignSchema = insertCampaignSchema.partial();

// server actions
export const createCampaignAction = serverAction({ method: 'POST' })
  .inputValidator(insertCampaignSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmCampaigns)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateCampaignAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateCampaignSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmCampaigns)
        .set(data.payload)
        .where(eq(crmCampaigns.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectCampaignAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmCampaigns).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmCampaigns)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
