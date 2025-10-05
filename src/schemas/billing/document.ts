import { z } from 'zod';
import { BillingDocumentTypeEnum } from '@/db/types';

// Zod schema for billing.document table
export const billingDocumentSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime().nullable(),
  documentType: z.enum(BillingDocumentTypeEnum),
  fileName: z.string(),
  filePath: z.string(),
  fileSize: z.number().nullable(),
  mimeType: z.string().nullable(),
  recordId: z.uuid(),
  recordType: z.string(),
  updatedAt: z.iso.datetime().nullable(),
  uploadedByUserId: z.string().nullable(),
});

export type BillingDocument = z.infer<typeof billingDocumentSchema>;

export const billingDocumentInsertSchema = billingDocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingDocumentUpdateSchema =
  billingDocumentInsertSchema.partial();
