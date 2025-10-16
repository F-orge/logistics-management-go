import { z } from 'zod'
import { TmsCurrencyEnum, TmsPartnerInvoiceStatusEnum } from '../../db.types'
import { PartnerInvoiceItemInsertSchema } from './partner_invoice_item'

export const PartnerInvoiceSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  carrierId: z.uuid({ message: 'Invalid UUID format for carrier ID' }),
  status: z
    .enum(TmsPartnerInvoiceStatusEnum, {
      message: 'Invalid partner invoice status',
    })
    .optional()
    .nullable(),
  totalAmount: z.coerce
    .number({ message: 'Total amount must be a number' })
    .min(0, { error: 'Total amount must be at least 0' })
    .max(10000000, { error: 'Total amount must be at most 10,000,000' }),
  invoiceDate: z.date({
    message: 'Invalid date format for invoice date',
  }),
  invoiceNumber: z
    .string({ message: 'Invoice number must be a string' })
    .min(1, { error: 'Invoice number is required' })
    .max(64, { error: 'Invoice number must be at most 64 characters' }),
  currency: z.enum(TmsCurrencyEnum).optional().nullable(),
  dueDate: z.date().optional().nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsPartnerInvoice = z.infer<typeof PartnerInvoiceSchema>

export const PartnerInvoiceInsertSchema = PartnerInvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  items: z.array(PartnerInvoiceItemInsertSchema).optional().nullable(),
})

export const PartnerInvoiceUpdateSchema = PartnerInvoiceInsertSchema.partial()
