import { index, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { user } from '../better-auth';
import { entityFields, omitEntity } from '../helpers';
import { crmContacts } from './contacts';
import { crmSchema } from './schema';

export const caseStatusEnum = crmSchema.enum('case_status', [
  'new',
  'in-progress',
  'waiting-for-customer',
  'waiting-for-internal',
  'escalated',
  'resolved',
  'closed',
  'cancelled',
]);

export const casePriorityEnum = crmSchema.enum('case_priority', [
  'critical',
  'high',
  'medium',
  'low',
]);

export const caseTypeEnum = crmSchema.enum('case_type', [
  'question',
  'problem',
  'complaint',
  'feature-request',
  'bug-report',
  'technical-support',
]);

export const crmCases = crmSchema.table(
  'cases',
  {
    ...entityFields,
    caseNumber: varchar('case_number', { length: 50 }).notNull().unique(),
    status: caseStatusEnum('status'),
    priority: casePriorityEnum('priority'),
    type: caseTypeEnum('type'),
    ownerId: text('owner_id')
      .notNull()
      .references(() => user.id),
    contactId: uuid('contact_id').references(() => crmContacts.id),
    description: text('description'),
  },
  (table) => [
    index('idx_crm_cases_status').on(table.status),
    index('idx_crm_cases_priority').on(table.priority),
    index('idx_crm_cases_type').on(table.type),
    index('idx_crm_cases_owner_id').on(table.ownerId),
    index('idx_crm_cases_contact_id').on(table.contactId),
    index('idx_crm_cases_case_number').on(table.caseNumber),
  ],
);

// zod schemas
export const insertCaseSchema = createInsertSchema(crmCases).omit(omitEntity);
export const updateCaseSchema = insertCaseSchema.partial();
