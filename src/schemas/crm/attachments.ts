import { z } from 'zod';
import { CrmRecordType } from '@/db/types';

export const crmAttachmentSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    fileName: z
      .string({ message: 'File name must be a string' })
      .min(1, { message: 'File name is required' })
      .max(255, { message: 'File name must be at most 255 characters' }),
    filePath: z
      .string({ message: 'File path must be a string' })
      .min(1, { message: 'File path is required' })
      .max(1024, { message: 'File path must be at most 1024 characters' }),
    mimeType: z
      .string({ message: 'MIME type must be a string' })
      .min(1, { message: 'MIME type is required' })
      .max(127, { message: 'MIME type must be at most 127 characters' })
      .nullable()
      .optional()
      .nullable(),
    recordId: z
      .string({ message: 'Record ID must be a string' })
      .nullable()
      .optional()
      .nullable(),
    recordType: z
      .enum(CrmRecordType, { message: 'Invalid CRM record type' })
      .nullable()
      .optional()
      .nullable(),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .nullable()
      .optional()
      .nullable(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .nullable()
      .optional()
      .nullable(),
  })
  .strict();

export type CrmAttachment = z.infer<typeof crmAttachmentSchema>;

export const crmAttachmentInsertSchema = crmAttachmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmAttachmentUpdateSchema = crmAttachmentInsertSchema.partial();
