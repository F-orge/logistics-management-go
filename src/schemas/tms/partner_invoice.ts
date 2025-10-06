import { z } from 'zod';
import { TmsCurrencyEnum, TmsPartnerInvoiceStatusEnum } from '@/db/types';
import { tmsPartnerInvoiceItemInsertSchema } from './partner_invoice_item';

export const tmsPartnerInvoiceSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  carrierId: z.uuid({ message: 'Invalid UUID format for carrier ID' }),
  status: z
    .enum(TmsPartnerInvoiceStatusEnum, {
      message: 'Invalid partner invoice status',
    })
    .nullable(),
  totalAmount: z.coerce
    .number({ message: 'Total amount must be a number' })
    .min(0, { error: 'Total amount must be at least 0' })
    .max(10000000, { error: 'Total amount must be at most 10,000,000' }),
  invoiceDate: z.iso.datetime({
    message: 'Invalid date format for invoice date',
  }),
  invoiceNumber: z
    .string({ message: 'Invoice number must be a string' })
    .min(1, { error: 'Invoice number is required' })
    .max(64, { error: 'Invoice number must be at most 64 characters' }),
  dueAt: z.iso
    .datetime({ message: 'Invalid date format for due date' })
    .nullable(),
  paidAt: z.iso
    .datetime({ message: 'Invalid date format for paid at' })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type TmsPartnerInvoice = z.infer<typeof tmsPartnerInvoiceSchema>;

export const tmsPartnerInvoiceInsertSchema = tmsPartnerInvoiceSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    items: z.array(tmsPartnerInvoiceItemInsertSchema).optional(),
  });

export const tmsPartnerInvoiceUpdateSchema =
  tmsPartnerInvoiceInsertSchema.partial();
