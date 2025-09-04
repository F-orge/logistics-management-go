// Drizzle ORM schema for crm_invoices
import { date, decimal, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const invoices = crmSchema.table('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  opportunityId: uuid('opportunity_id'), // FK to opportunities
  status: varchar('status', { length: 32 }),
  total: decimal('total', { precision: 16, scale: 2 }),
  issueDate: date('issue_date'),
  dueDate: date('due_date'),
  sentAt: timestamp('sent_at', { withTimezone: true }),
  paidAt: timestamp('paid_at', { withTimezone: true }),
  paymentMethod: varchar('payment_method', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
