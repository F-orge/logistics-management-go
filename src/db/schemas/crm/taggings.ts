import { index, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { recordTypeEnum } from './attachments';
import { crmSchema } from './schema';
import { eq, and } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/utils';
import z from 'zod';
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

// server actions
export const createTaggingAction = serverAction({ method: 'POST' })
  .inputValidator(insertTaggingSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmTaggings)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateTaggingAction = serverAction({ method: 'POST' })
  .inputValidator(
    z.object({
      tag_id: z.string().uuid(),
      record_id: z.string().uuid(),
      payload: updateTaggingSchema,
    }),
  )
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmTaggings)
        .set(data.payload)
        .where(
          and(
            eq(crmTaggings.tag_id, data.tag_id),
            eq(crmTaggings.record_id, data.record_id),
          ),
        )
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectTaggingAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmTaggings).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmTaggings)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
