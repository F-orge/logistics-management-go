import { index, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
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
