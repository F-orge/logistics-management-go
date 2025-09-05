// Drizzle ORM schema for tms_partner_invoices
import { date, decimal, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const partnerInvoices = tmsSchema.table('partner_invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  carrierId: uuid('carrier_id').notNull(), // FK to carriers
  invoiceNumber: varchar('invoice_number', { length: 64 }).notNull(),
  invoiceDate: date('invoice_date').notNull(),
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }),
  status: varchar('status', { length: 32 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
