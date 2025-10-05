import { z } from 'zod';
import { CrmRecordType } from '@/db/types';

export const crmAttachmentSchema = z.object({
  id: z.uuid(),
  fileName: z
    .string()
    .min(1, { error: 'File name is required' })
    .max(255, { error: 'File name must be at most 255 characters' }),
  filePath: z
    .string()
    .min(1, { error: 'File path is required' })
    .max(1024, { error: 'File path must be at most 1024 characters' }),
  mimeType: z
    .string()
    .min(1, { error: 'MIME type is required' })
    .max(127, { error: 'MIME type must be at most 127 characters' })
    .nullable(),
  recordId: z.uuid().nullable(),
  recordType: z.enum(CrmRecordType).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmAttachment = z.infer<typeof crmAttachmentSchema>;

export const crmAttachmentInsertSchema = crmAttachmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmAttachmentUpdateSchema = crmAttachmentInsertSchema.partial();
