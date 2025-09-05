// Drizzle ORM schema for crm_campaigns
import { date, decimal, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const campaigns = crmSchema.table('campaigns', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 128 }).notNull(),
  budget: decimal('budget', { precision: 16, scale: 2 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
