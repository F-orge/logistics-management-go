import { index, numeric, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from '../better-auth';
import { entityFields } from '../helpers';
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
