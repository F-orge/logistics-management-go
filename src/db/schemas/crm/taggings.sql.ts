// Drizzle ORM schema for crm_taggings
import { uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const taggings = crmSchema.table('taggings', {
  tagId: uuid('tag_id').primaryKey(), // FK to tags
  recordId: uuid('record_id').primaryKey(), // Polymorphic FK
  recordType: varchar('record_type', { length: 64 }), // Polymorphic type
});
