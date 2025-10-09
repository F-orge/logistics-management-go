import { z } from 'zod';
import { BillingDocumentTypeEnum } from '@/db/types';

// Zod schema for billing.document table
export const billingDocumentSchema = z.object({
  id: z.uuid(),
  createdAt: z.date().optional().nullable(),
  documentType: z.enum(BillingDocumentTypeEnum),
  fileName: z
    .string()
    .min(1, { error: 'File name is required' })
    .max(255, { error: 'File name must be at most 255 characters' }),
  filePath: z
    .string()
    .min(1, { error: 'File path is required' })
    .max(1024, { error: 'File path must be at most 1024 characters' }),
  fileSize: z
    .number()
    .min(0, { error: 'File size must be at least 0' })
    .max(100000000, { error: 'File size must be at most 100,000,000' })
    .optional()
    .nullable(),
  mimeType: z
    .string()
    .min(1, { error: 'MIME type is required' })
    .max(127, { error: 'MIME type must be at most 127 characters' })
    .optional()
    .nullable(),
  recordId: z.uuid(),
  recordType: z
    .string()
    .min(1, { error: 'Record type is required' })
    .max(64, { error: 'Record type must be at most 64 characters' }),
  updatedAt: z.date().optional().nullable(),
  uploadedByUserId: z
    .string()
    .min(1, { error: 'Uploaded by user ID is required' })
    .max(255, { error: 'Uploaded by user ID must be at most 255 characters' })
    .optional()
    .nullable(),
});

export type BillingDocument = z.infer<typeof billingDocumentSchema>;

export const billingDocumentInsertSchema = billingDocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingDocumentUpdateSchema =
  billingDocumentInsertSchema.partial();
