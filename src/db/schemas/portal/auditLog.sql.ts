// Drizzle ORM schema for portal_audit_log
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { portalSchema } from './index';

export const auditLog = portalSchema.table('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(), // FK to users
  action: varchar('action', { length: 32 }).notNull(),
  subject: varchar('subject', { length: 32 }).notNull(),
  subjectId: uuid('subject_id'),
  details: text('details'),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
});
