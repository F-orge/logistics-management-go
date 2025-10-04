import { eq } from 'drizzle-orm';
import { index, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { selectSchema, serverAction } from '@/lib/server-utils';
import { entityFields, omitEntity } from '../helpers';
import { crmSchema } from './schema';

export const recordTypeEnum = crmSchema.enum('record_type', [
  'companies',
  'contacts',
  'leads',
  'opportunities',
  'cases',
  'interactions',
  'campaigns',
  'products',
  'invoices',
]);

export const crmAttachments = crmSchema.table(
  'attachments',
  {
    ...entityFields,
    fileName: varchar('file_name', { length: 255 }).notNull(),
    filePath: varchar('file_path', { length: 500 }).notNull(),
    mimeType: varchar('mime_type', { length: 100 }),
    recordId: uuid('record_id'),
    recordType: recordTypeEnum('record_type'),
  },
  (table) => [
    index('idx_crm_attachments_record').on(table.recordType, table.recordId),
    index('idx_crm_attachments_mime_type').on(table.mimeType),
  ],
);

// zod schemas
export const insertAttachmentSchema =
  createInsertSchema(crmAttachments).omit(omitEntity);

export const updateAttachmentSchema = insertAttachmentSchema.partial();

// server actions
export const createAttachmentAction = serverAction({ method: 'POST' })
  .inputValidator(insertAttachmentSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmAttachments)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateAttachmentAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateAttachmentSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmAttachments)
        .set(data.payload)
        .where(eq(crmAttachments.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectAttachmentAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmAttachments).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmAttachments)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
