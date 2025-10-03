import { index, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { entityFields } from '../helpers';
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
    file_name: varchar('file_name', { length: 255 }).notNull(),
    file_path: varchar('file_path', { length: 500 }).notNull(),
    mime_type: varchar('mime_type', { length: 100 }),
    record_id: uuid('record_id'),
    record_type: recordTypeEnum('record_type'),
  },
  (table) => [
    index('idx_crm_attachments_record').on(table.record_type, table.record_id),
    index('idx_crm_attachments_mime_type').on(table.mime_type),
  ],
);
