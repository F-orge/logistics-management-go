import { z } from 'zod';
import { CrmInvoiceStatus, CrmPaymentMethod } from '@/db/types';
import { crmInvoiceItemInsertSchema } from './invoice_items';

export const crmInvoiceSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  issueDate: z
    .date({ message: 'Invalid ISO datetime format for issue date' })
    .optional(),
  dueDate: z
    .date({ message: 'Invalid ISO datetime format for due date' })
    .optional(),
  paidAt: z
    .date({ message: 'Invalid ISO datetime format for paid at date' })
    .optional(),
  sentAt: z
    .date({ message: 'Invalid ISO datetime format for sent at date' })
    .optional(),
  opportunityId: z
    .uuid({ message: 'Invalid UUID format for opportunity ID' })
    .optional(),
  paymentMethod: z
    .enum(CrmPaymentMethod, { message: 'Invalid payment method' })
    .optional(),
  status: z
    .enum(CrmInvoiceStatus, { message: 'Invalid invoice status' })
    .optional(),
  total: z.coerce.number({ message: 'Total must be a number' }).optional(),
  createdAt: z
    .date({ message: 'Invalid ISO datetime format for creation date' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid ISO datetime format for update date' })
    .optional(),
}).strict();

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
