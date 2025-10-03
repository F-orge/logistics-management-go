import { index, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { recordTypeEnum } from './attachments';
import { crmSchema } from './schema';
import { crmTags } from './tags';

export const crmTaggings = crmSchema.table(
  'taggings',
  {
    tag_id: uuid('tag_id')
      .notNull()
      .references(() => crmTags.id),
    record_id: uuid('record_id').notNull(),
    record_type: recordTypeEnum('record_type'),
  },
  (table) => [
    index('idx_crm_taggings_record').on(table.record_type, table.record_id),
    index('idx_crm_taggings_tag_id').on(table.tag_id),
  ],
);

// zod schemas
export const insertTaggingSchema = createInsertSchema(crmTaggings);
export const updateTaggingSchema = insertTaggingSchema.partial();
