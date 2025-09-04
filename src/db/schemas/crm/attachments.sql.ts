// Drizzle ORM schema for crm_attachments
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const attachments = crmSchema.table('attachments', {
  id: uuid('id').primaryKey().defaultRandom(),
  fileName: varchar('file_name', { length: 128 }),
  filePath: varchar('file_path', { length: 256 }),
  mimeType: varchar('mime_type', { length: 64 }),
  recordId: uuid('record_id'), // Polymorphic FK
  recordType: varchar('record_type', { length: 64 }), // Polymorphic type
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
