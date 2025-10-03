import {
  date,
  index,
  numeric,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { entityFields } from '../helpers';
import { crmSchema } from './schema';

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
