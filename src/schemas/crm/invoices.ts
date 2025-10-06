import { z } from 'zod';
import { CrmInvoiceStatus, CrmPaymentMethod } from '@/db/types';
import { crmInvoiceItemInsertSchema } from './invoice_items';

export const crmInvoiceSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  issueDate: z.iso.datetime({ message: 'Invalid ISO datetime format for issue date' }).nullable(),
  dueDate: z.iso.datetime({ message: 'Invalid ISO datetime format for due date' }).nullable(),
  paidAt: z.iso.datetime({ message: 'Invalid ISO datetime format for paid at date' }).nullable(),
  sentAt: z.iso.datetime({ message: 'Invalid ISO datetime format for sent at date' }).nullable(),
  opportunityId: z.uuid({ message: 'Invalid UUID format for opportunity ID' }).nullable(),
  paymentMethod: z.enum(CrmPaymentMethod, { message: 'Invalid payment method' }).nullable(),
  status: z.enum(CrmInvoiceStatus, { message: 'Invalid invoice status' }).nullable(),
  total: z.coerce.number({ message: 'Total must be a number' }).nullable(),
  createdAt: z.iso.datetime({ message: 'Invalid ISO datetime format for creation date' }).nullable(),
  updatedAt: z.iso.datetime({ message: 'Invalid ISO datetime format for update date' }).nullable(),
});

export type CrmInvoice = z.infer<typeof crmInvoiceSchema>;

export const crmInvoiceInsertSchema = crmInvoiceSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    items: z.array(crmInvoiceItemInsertSchema).optional(),
  });

export const crmInvoiceUpdateSchema = crmInvoiceSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();
