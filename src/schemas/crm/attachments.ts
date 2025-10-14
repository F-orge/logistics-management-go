import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';
import { CrmRecordType } from '@/db/types';

export const crmAttachmentSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    fileName: z
      .string({ message: 'File name must be a string' })
      .min(1, { message: 'File name is required' })
      .max(255, { message: 'File name must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'File Name',
          description: 'The name of the attached file.',
        }),
      ),
    filePath: z
      .string({ message: 'File path must be a string' })
      .min(1, { message: 'File path is required' })
      .max(1024, { message: 'File path must be at most 1024 characters' })
      .check(
        fieldConfig({
          label: 'File Path',
          description: 'The storage path of the attached file.',
        }),
      ),
    mimeType: z
      .string({ message: 'MIME type must be a string' })
      .min(1, { message: 'MIME type is required' })
      .max(127, { message: 'MIME type must be at most 127 characters' })
      .check(
        fieldConfig({
          label: 'MIME Type',
          description: 'The MIME type of the file.',
        }),
      )
      .nullable()
      .optional(),
    recordId: z
      .string({ message: 'Record ID must be a string' })
      .check(
        fieldConfig({
          label: 'Record ID',
          description:
            'The ID of the record this attachment is associated with.',
        }),
      )
      .nullable()
      .optional(),
    recordType: z
      .enum(CrmRecordType, { message: 'Invalid CRM record type' })
      .check(
        fieldConfig({
          label: 'Record Type',
          description: 'The type of record this attachment is associated with.',
        }),
      )
      .nullable()
      .optional(),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .nullable()
      .optional(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .nullable()
      .optional(),
  })
  .strict();

export type CrmAttachment = z.infer<typeof crmAttachmentSchema>;

export const crmAttachmentInsertSchema = crmAttachmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmAttachmentUpdateSchema = crmAttachmentInsertSchema.partial();
