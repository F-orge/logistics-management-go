import { z } from 'zod';
import { CrmRecordType } from '@/db/types';

export const crmTaggingSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  recordId: z.uuid({ message: 'Invalid UUID format for record ID' }),
  recordType: z.enum(CrmRecordType, { message: 'Invalid CRM record type' }),
  tagId: z.uuid({ message: 'Invalid UUID format for tag ID' }),
});

export type CrmTagging = z.infer<typeof crmTaggingSchema>;

export const crmTaggingInsertSchema = crmTaggingSchema.omit({
  id: true,
});

export const crmTaggingUpdateSchema = crmTaggingInsertSchema.partial();
