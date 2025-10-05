import { z } from 'zod';
import { CrmRecordType } from '@/db/types';

export const crmTaggingSchema = z.object({
  id: z.string(),
  recordId: z.string(),
  recordType: z.enum(CrmRecordType),
  tagId: z.string(),
});

export type CrmTagging = z.infer<typeof crmTaggingSchema>;

export const crmTaggingInsertSchema = crmTaggingSchema.omit({
  id: true,
});

export const crmTaggingUpdateSchema = crmTaggingInsertSchema.partial();
