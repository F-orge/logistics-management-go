import { z } from 'zod';
import { CrmInvoiceStatus, CrmPaymentMethod } from '@/db/types';
import { crmInvoiceItemInsertSchema } from './invoice_items';

export const crmInvoiceSchema = z.object({
  id: z.string(),
  issueDate: z.iso.datetime().nullable(),
  dueDate: z.iso.datetime().nullable(),
  paidAt: z.iso.datetime().nullable(),
  sentAt: z.iso.datetime().nullable(),
  opportunityId: z.string().nullable(),
  paymentMethod: z.enum(CrmPaymentMethod).nullable(),
  status: z.enum(CrmInvoiceStatus).nullable(),
  total: z.coerce.number().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
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
