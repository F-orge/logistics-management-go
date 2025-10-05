import { z } from 'zod';

export const tmsPartnerInvoiceItemSchema = z.object({
  id: z.string(),
  partnerInvoiceId: z.uuid(),
  description: z.string(),
  amount: z.coerce.number(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsPartnerInvoiceItem = z.infer<typeof tmsPartnerInvoiceItemSchema>;

export const tmsPartnerInvoiceItemInsertSchema =
  tmsPartnerInvoiceItemSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const tmsPartnerInvoiceItemUpdateSchema =
  tmsPartnerInvoiceItemInsertSchema.partial();
