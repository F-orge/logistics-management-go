// Drizzle ORM schema for billing_documents
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const documents = billingSchema.table('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  recordId: uuid('record_id').notNull(), // Polymorphic FK
  recordType: varchar('record_type', { length: 32 }),
  documentType: varchar('document_type', { length: 32 }),
  filePath: varchar('file_path', { length: 256 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
