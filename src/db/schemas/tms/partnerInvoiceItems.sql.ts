// Drizzle ORM schema for tms_partner_invoice_items
import { uuid, decimal } from 'drizzle-orm/pg-core';
import { tmsSchema } from './index';

export const partnerInvoiceItems = tmsSchema.table('partner_invoice_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  partnerInvoiceId: uuid('partner_invoice_id').notNull(), // FK to partner_invoices
  shipmentLegId: uuid('shipment_leg_id').notNull(), // FK to shipment_legs
  amount: decimal('amount', { precision: 12, scale: 2 }),
});
