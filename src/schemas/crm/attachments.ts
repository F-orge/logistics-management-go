import { z } from 'zod';
import { CrmRecordType } from '@/db/types';

export const crmAttachmentSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  filePath: z.string(),
  mimeType: z.string().nullable(),
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
