import { z } from 'zod';

export const tmsPartnerInvoiceItemSchema = z.object({
  id: z.uuid(),
  partnerInvoiceId: z.uuid(),
  shipmentLegId: z.uuid(),
  amount: z.coerce
    .number()
    .min(0, { error: 'Amount must be at least 0' })
    .max(1000000, { error: 'Amount must be at most 1,000,000' }),
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
