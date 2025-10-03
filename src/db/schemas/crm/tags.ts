import { index, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { entityFields } from '../helpers';
import { crmSchema } from './schema';

export const crmTags = crmSchema.table(
  'tags',
  {
    ...entityFields,
    name: varchar('name', { length: 100 }).notNull().unique(),
  },
  (table) => [index('idx_crm_tags_name').on(table.name)],
);
