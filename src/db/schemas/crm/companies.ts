import { eq } from 'drizzle-orm';
import { index, numeric, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { selectSchema, serverAction } from '@/lib/server-utils';
import { user } from '../better-auth';
import { entityFields, omitEntity } from '../helpers';
import { crmSchema } from './schema';

export const crmCompanies = crmSchema.table(
  'companies',
  {
    ...entityFields,
    name: varchar('name', { length: 255 }).notNull(),
    street: varchar('street', { length: 255 }),
    city: varchar('city', { length: 255 }),
    state: varchar('state', { length: 255 }),
    postalCode: varchar('postal_code', { length: 20 }),
    country: varchar('country', { length: 100 }),
    phoneNumber: varchar('phone_number', { length: 20 }),
    industry: varchar('industry', { length: 100 }),
    website: varchar('website', { length: 255 }),
    annualRevenue: numeric('annual_revenue', { scale: 2, precision: 15 }),
    ownerId: text('owner_id').references(() => user.id),
  },
  (table) => [
    index('idx_crm_companies_name').on(table.name),
    index('idx_crm_companies_industry').on(table.industry),
    index('idx_crm_companies_owner_id').on(table.ownerId),
    index('idx_crm_companies_country').on(table.country),
  ],
);

// zod schemas
export const insertCompanySchema =
  createInsertSchema(crmCompanies).omit(omitEntity);

export const updateCompanySchema = insertCompanySchema.partial();

// server actions
export const createCompanyAction = serverAction({ method: 'POST' })
  .inputValidator(insertCompanySchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmCompanies)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateCompanyAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateCompanySchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmCompanies)
        .set(data.payload)
        .where(eq(crmCompanies.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectCompanyAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmCompanies).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmCompanies)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
