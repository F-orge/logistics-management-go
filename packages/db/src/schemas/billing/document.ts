import { z } from 'zod'
import { BillingDocumentTypeEnum } from '../../db.types'

// Zod schema for .document table
export const DocumentSchema = z
  .object({
    id: z.uuid(),
    createdAt: z.date().optional().nullable(),
    documentType: z.enum(BillingDocumentTypeEnum),
    fileName: z
      .string()
      .min(1, { message: 'File name is required' })
      .max(255, { message: 'File name must be at most 255 characters' }),
    filePath: z
      .string()
      .min(1, { message: 'File path is required' })
      .max(1024, { message: 'File path must be at most 1024 characters' }),
    fileSize: z
      .number()
      .min(0, { message: 'File size must be at least 0' })
      .max(100000000, { message: 'File size must be at most 100,000,000' })
      .optional()
      .nullable(),
    mimeType: z
      .string()
      .min(1, { message: 'MIME type is required' })
      .max(127, { message: 'MIME type must be at most 127 characters' })
      .optional()
      .nullable(),
    recordId: z.uuid(),
    recordType: z
      .string()
      .min(1, { message: 'Record type is required' })
      .max(64, { message: 'Record type must be at most 64 characters' }),
    updatedAt: z.date().optional().nullable(),
    uploadedByUserId: z
      .string()
      .min(1, { message: 'Uploaded by user ID is required' })
      .max(255, {
        message: 'Uploaded by user ID must be at most 255 characters',
      })
      .optional()
      .nullable(),
  })
  .strict()

export type BillingDocument = z.infer<typeof DocumentSchema>

export const DocumentInsertSchema = DocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict()

export const DocumentUpdateSchema = DocumentInsertSchema.partial().strict()
