import { z } from 'zod';

export const crmInvoiceItemSchema = z.object({
  id: z.string(),
  invoiceId: z.uuid(),
  productId: z.uuid(),
  price: z.coerce.number(),
  quantity: z.number(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmInvoiceItem = z.infer<typeof crmInvoiceItemSchema>;

export const crmInvoiceItemInsertSchema = crmInvoiceItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmInvoiceItemUpdateSchema = crmInvoiceItemInsertSchema.partial();
