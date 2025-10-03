import { index, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { entityFields, omitEntity } from '../helpers';
import { crmSchema } from './schema';

export const crmTags = crmSchema.table(
  'tags',
  {
    ...entityFields,
    name: varchar('name', { length: 100 }).notNull().unique(),
  },
  (table) => [index('idx_crm_tags_name').on(table.name)],
);

// zod schemas
export const insertTagSchema = createInsertSchema(crmTags).omit(omitEntity);
export const updateTagSchema = insertTagSchema.partial();
