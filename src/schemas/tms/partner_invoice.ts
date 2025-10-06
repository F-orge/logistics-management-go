import { z } from 'zod';
import { TmsCurrencyEnum, TmsPartnerInvoiceStatusEnum } from '@/db/types';
import { tmsPartnerInvoiceItemInsertSchema } from './partner_invoice_item';

export const tmsPartnerInvoiceSchema = z.object({
  id: z.uuid(),
  carrierId: z.uuid(),
  status: z.enum(TmsPartnerInvoiceStatusEnum).nullable(),
  totalAmount: z.coerce.number(),
  invoiceDate: z.iso.datetime(),
  invoiceNumber: z.string(),
  dueAt: z.iso.datetime().nullable(),
  paidAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
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
