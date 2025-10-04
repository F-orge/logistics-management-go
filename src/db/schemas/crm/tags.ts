import { eq } from 'drizzle-orm';
import { index, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { selectSchema, serverAction } from '@/lib/server-utils';
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
